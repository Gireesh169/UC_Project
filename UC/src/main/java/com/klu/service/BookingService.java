package com.klu.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Booking;
import com.klu.model.Issue;
import com.klu.model.ServiceEntity;
import com.klu.model.Technician;
import com.klu.model.User;
import com.klu.repository.BookingRepository;
import com.klu.repository.IssueRepository;
import com.klu.repository.ServiceRepository;
import com.klu.repository.TechnicianRepository;
import com.klu.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuditLogService auditLogService;

    public Booking createBooking(Long userId, Long serviceId, Long issueId, String address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found: " + serviceId));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new IllegalArgumentException("Issue not found: " + issueId));

        double basePrice = service.getBasePrice();
        double issuePrice = issue.getPrice();
        double subtotal = basePrice + issuePrice;
        double gst = Math.round(subtotal * 0.18 * 100.0) / 100.0;
        double finalPrice = Math.round((subtotal + gst) * 100.0) / 100.0;

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setService(service);
        booking.setIssue(issue);
        booking.setAddress(address);
        booking.setBasePrice(basePrice);
        booking.setIssuePrice(issuePrice);
        booking.setGst(gst);
        booking.setFinalPrice(finalPrice);
        booking.setTotalPrice(finalPrice);
        booking.setStatus("PENDING");
        booking.setBookingDate(LocalDateTime.now());
        booking.setTechnician(null);

        Booking savedBooking = bookingRepository.save(booking);

        // Send email & notification
        emailService.sendBookingNotificationEmail(user.getEmail(), user.getName(), savedBooking.getId(), service.getName(), "PENDING");
        notificationService.createNotification(user, "Booking Confirmed", "Your booking #" + savedBooking.getId() + " for " + service.getName() + " has been placed.", "BOOKING");
        auditLogService.logAction(user.getEmail(), "CREATE_BOOKING", "Booking #" + savedBooking.getId() + " created", "127.0.0.1");

        return savedBooking;
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with ID: " + bookingId));
    }

    public List<Booking> searchAndSortBookings(
            Long bookingId,
            String query,
            String status,
            Long serviceId,
            Double minPrice,
            Double maxPrice,
            String startDate,
            String endDate,
            String sortBy) {

        List<Booking> allBookings = bookingRepository.findAll();

        return allBookings.stream()
                .filter(b -> {
                    if (bookingId != null && !b.getId().equals(bookingId)) return false;
                    if (status != null && !status.trim().isEmpty() && !"ALL".equalsIgnoreCase(status)) {
                        if (!b.getStatus().equalsIgnoreCase(status.trim())) return false;
                    }
                    if (serviceId != null && (b.getService() == null || !b.getService().getId().equals(serviceId))) {
                        return false;
                    }
                    double price = b.getFinalPrice() > 0 ? b.getFinalPrice() : b.getTotalPrice();
                    if (minPrice != null && price < minPrice) return false;
                    if (maxPrice != null && price > maxPrice) return false;

                    if (query != null && !query.trim().isEmpty()) {
                        String q = query.trim().toLowerCase();
                        boolean matchId = String.valueOf(b.getId()).contains(q);
                        boolean matchCust = b.getUser() != null && (
                                (b.getUser().getName() != null && b.getUser().getName().toLowerCase().contains(q)) ||
                                (b.getUser().getEmail() != null && b.getUser().getEmail().toLowerCase().contains(q)) ||
                                (b.getUser().getPhone() != null && b.getUser().getPhone().toLowerCase().contains(q))
                        );
                        boolean matchTech = b.getTechnician() != null && (
                                (b.getTechnician().getName() != null && b.getTechnician().getName().toLowerCase().contains(q)) ||
                                (b.getTechnician().getPhone() != null && b.getTechnician().getPhone().toLowerCase().contains(q))
                        );
                        boolean matchService = b.getService() != null && b.getService().getName() != null && b.getService().getName().toLowerCase().contains(q);
                        boolean matchIssue = b.getIssue() != null && b.getIssue().getTitle() != null && b.getIssue().getTitle().toLowerCase().contains(q);

                        if (!matchId && !matchCust && !matchTech && !matchService && !matchIssue) {
                            return false;
                        }
                    }

                    if (startDate != null && !startDate.trim().isEmpty()) {
                        try {
                            java.time.LocalDate start = java.time.LocalDate.parse(startDate.trim());
                            if (b.getBookingDate() == null || b.getBookingDate().toLocalDate().isBefore(start)) {
                                return false;
                            }
                        } catch (Exception e) {}
                    }

                    if (endDate != null && !endDate.trim().isEmpty()) {
                        try {
                            java.time.LocalDate end = java.time.LocalDate.parse(endDate.trim());
                            if (b.getBookingDate() == null || b.getBookingDate().toLocalDate().isAfter(end)) {
                                return false;
                            }
                        } catch (Exception e) {}
                    }

                    return true;
                })
                .sorted((b1, b2) -> {
                    if ("oldest".equalsIgnoreCase(sortBy)) {
                        return b1.getBookingDate() != null && b2.getBookingDate() != null 
                                ? b1.getBookingDate().compareTo(b2.getBookingDate()) : 0;
                    } else if ("highestPrice".equalsIgnoreCase(sortBy)) {
                        double p1 = b1.getFinalPrice() > 0 ? b1.getFinalPrice() : b1.getTotalPrice();
                        double p2 = b2.getFinalPrice() > 0 ? b2.getFinalPrice() : b2.getTotalPrice();
                        return Double.compare(p2, p1);
                    } else if ("lowestPrice".equalsIgnoreCase(sortBy)) {
                        double p1 = b1.getFinalPrice() > 0 ? b1.getFinalPrice() : b1.getTotalPrice();
                        double p2 = b2.getFinalPrice() > 0 ? b2.getFinalPrice() : b2.getTotalPrice();
                        return Double.compare(p1, p2);
                    } else { // default "newest"
                        return b1.getBookingDate() != null && b2.getBookingDate() != null 
                                ? b2.getBookingDate().compareTo(b1.getBookingDate()) : 0;
                    }
                })
                .toList();
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUser_Id(userId);
    }

    public List<Booking> getTechnicianBookings(Long technicianId) {
        return bookingRepository.findByTechnicianId(technicianId);
    }

    public Booking updateStatus(Long bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + bookingId));

        String currentStatus = booking.getStatus();
        String formattedNewStatus = newStatus.toUpperCase();

        // Validate state transitions
        validateStatusTransition(currentStatus, formattedNewStatus);

        booking.setStatus(formattedNewStatus);
        if ("TECHNICIAN_ACCEPTED".equals(formattedNewStatus)) {
            booking.setAcceptedAt(LocalDateTime.now());
        } else if ("COMPLETED".equals(formattedNewStatus)) {
            booking.setCompletedAt(LocalDateTime.now());
        }

        Booking saved = bookingRepository.save(booking);

        if (saved.getUser() != null) {
            emailService.sendBookingNotificationEmail(saved.getUser().getEmail(), saved.getUser().getName(), saved.getId(), saved.getService().getName(), formattedNewStatus);
            notificationService.createNotification(saved.getUser(), "Booking Status Updated", "Booking #" + saved.getId() + " is now " + formattedNewStatus, "BOOKING");
        }

        return saved;
    }

    private void validateStatusTransition(String currentStatus, String newStatus) {
        if (currentStatus.equals(newStatus)) {
            return;
        }

        switch (currentStatus) {
            case "PENDING":
                if (!newStatus.equals("TECHNICIAN_ASSIGNED") && !newStatus.equals("ASSIGNED")) {
                    throw new IllegalStateException("PENDING booking can only transition to TECHNICIAN_ASSIGNED.");
                }
                break;
            case "TECHNICIAN_ASSIGNED":
            case "ASSIGNED":
                if (!newStatus.equals("TECHNICIAN_ACCEPTED") && !newStatus.equals("PENDING") && !newStatus.equals("IN_PROGRESS")) {
                    throw new IllegalStateException("ASSIGNED booking can transition to TECHNICIAN_ACCEPTED or back to PENDING.");
                }
                break;
            case "TECHNICIAN_ACCEPTED":
                if (!newStatus.equals("IN_PROGRESS")) {
                    throw new IllegalStateException("TECHNICIAN_ACCEPTED booking can only transition to IN_PROGRESS.");
                }
                break;
            case "IN_PROGRESS":
                if (!newStatus.equals("COMPLETED")) {
                    throw new IllegalStateException("IN_PROGRESS booking can only transition to COMPLETED.");
                }
                break;
            case "COMPLETED":
                if (!newStatus.equals("REVIEWED")) {
                    throw new IllegalStateException("COMPLETED booking can only transition to REVIEWED.");
                }
                break;
            case "REVIEWED":
                throw new IllegalStateException("REVIEWED booking is terminal and cannot change status.");
            default:
                break;
        }
    }

    public Booking assignTechnician(Long bookingId, Long technicianId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + bookingId));

        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() -> new IllegalArgumentException("Technician not found: " + technicianId));

        booking.setTechnician(technician);
        booking.setStatus("TECHNICIAN_ASSIGNED");
        booking.setAssignedAt(LocalDateTime.now());

        Booking saved = bookingRepository.save(booking);

        // Notify User and Technician
        if (saved.getUser() != null) {
            emailService.sendBookingNotificationEmail(saved.getUser().getEmail(), saved.getUser().getName(), saved.getId(), saved.getService().getName(), "TECHNICIAN_ASSIGNED");
            notificationService.createNotification(saved.getUser(), "Technician Assigned", "Technician " + technician.getName() + " has been assigned to booking #" + saved.getId(), "ASSIGNMENT");
        }

        if (technician.getUser() != null) {
            notificationService.createNotification(technician.getUser(), "New Service Job Assigned", "You have been assigned to booking #" + saved.getId() + " at " + saved.getAddress(), "ASSIGNMENT");
        }

        return saved;
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByTechnician(Long technicianId) {
        return bookingRepository.findByTechnician_IdOrTechnician_User_Id(technicianId, technicianId);
    }

    public List<Booking> getPendingBookings() {
        return bookingRepository.findByStatus("PENDING");
    }

    public List<Booking> getBookingHistory() {
        return bookingRepository.findAll();
    }
}
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

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setService(service);
        booking.setIssue(issue);
        booking.setAddress(address);
        booking.setTotalPrice(issue.getPrice());
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
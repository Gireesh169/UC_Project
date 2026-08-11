package com.klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klu.dto.CreateTechnicianRequest;
import com.klu.model.Technician;
import com.klu.model.User;
import com.klu.repository.BookingRepository;
import com.klu.repository.TechnicianRepository;
import com.klu.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.klu.dto.CustomerDetailsResponse;
import com.klu.dto.TechnicianDetailsResponse;
import com.klu.repository.ReviewRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuditLogService auditLogService;

    @Transactional
    public Technician createTechnicianAccount(CreateTechnicianRequest request, String adminEmail) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User with email " + request.getEmail() + " already exists!");
        }

        // 1. Create User account with ROLE_TECHNICIAN
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getTempPassword()));
        user.setRole("worker"); // Mapped to ROLE_TECHNICIAN
        user.setEnabled(true);
        user.setAddress("Technician Operational Location");

        User savedUser = userRepository.save(user);

        // 2. Create Technician Profile
        Technician technician = new Technician();
        technician.setName(request.getName());
        technician.setPhone(request.getPhone());
        technician.setSkills(request.getSkills());
        technician.setExperience(request.getExperience());
        technician.setRating(5.0);
        technician.setAvailable(request.isAvailable());
        technician.setUser(savedUser);

        Technician savedTechnician = technicianRepository.save(technician);

        // 3. Send Welcome Email
        emailService.sendTechnicianWelcomeEmail(request.getEmail(), request.getName(), request.getTempPassword());

        // 4. Audit Log
        auditLogService.logAction(adminEmail, "CREATE_TECHNICIAN", "Created technician: " + request.getEmail(), "127.0.0.1");

        return savedTechnician;
    }

    public Map<String, Object> getDashboardAnalytics() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalTechnicians = technicianRepository.count();
        long totalBookings = bookingRepository.count();
        long pendingBookings = bookingRepository.countByStatus("PENDING");
        long assignedBookings = bookingRepository.countByStatus("TECHNICIAN_ASSIGNED")
                + bookingRepository.countByStatus("ASSIGNED")
                + bookingRepository.countByStatus("TECHNICIAN_ACCEPTED")
                + bookingRepository.countByStatus("IN_PROGRESS");
        long completedJobs = bookingRepository.countByStatus("COMPLETED") + bookingRepository.countByStatus("REVIEWED");
        long cancelledBookings = bookingRepository.countByStatus("CANCELLED");

        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        long bookingsToday = bookingRepository.countBookingsAfter(todayStart);

        double totalRevenue = bookingRepository.calculateTotalRevenue();
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        double monthlyRevenue = bookingRepository.calculateRevenueAfter(monthStart);

        double avgBookingPrice = completedJobs > 0 ? Math.round((totalRevenue / completedJobs) * 100.0) / 100.0 : 0.0;

        stats.put("totalUsers", totalUsers);
        stats.put("totalTechnicians", totalTechnicians);
        stats.put("totalBookings", totalBookings);
        stats.put("pendingBookings", pendingBookings);
        stats.put("assignedBookings", assignedBookings);
        stats.put("completedJobs", completedJobs);
        stats.put("cancelledBookings", cancelledBookings);
        stats.put("bookingsToday", bookingsToday);
        stats.put("totalRevenue", totalRevenue);
        stats.put("monthlyRevenue", monthlyRevenue);
        stats.put("avgBookingPrice", avgBookingPrice);

        return stats;
    }

    public List<CustomerDetailsResponse> getCustomerProfiles() {
        List<User> users = userRepository.findAll();
        List<CustomerDetailsResponse> list = new ArrayList<>();

        for (User u : users) {
            if ("citizen".equalsIgnoreCase(u.getRole()) || "USER".equalsIgnoreCase(u.getRole())) {
                CustomerDetailsResponse dto = new CustomerDetailsResponse();
                dto.setId(u.getId());
                dto.setName(u.getName());
                dto.setEmail(u.getEmail());
                dto.setPhone(u.getPhone());
                dto.setAddress(u.getAddress());
                dto.setRegistrationDate(u.getCreatedAt());
                dto.setLastLogin(u.getLastLogin());
                dto.setTotalBookings(bookingRepository.countByUser_Id(u.getId()));
                dto.setCompletedBookings(bookingRepository.countByUser_IdAndStatus(u.getId(), "COMPLETED") + bookingRepository.countByUser_IdAndStatus(u.getId(), "REVIEWED"));
                dto.setPendingBookings(bookingRepository.countByUser_IdAndStatus(u.getId(), "PENDING"));
                dto.setReviewsGiven(reviewRepository.countByUser_Id(u.getId()));
                list.add(dto);
            }
        }
        return list;
    }

    public CustomerDetailsResponse getCustomerById(Long userId) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        CustomerDetailsResponse dto = new CustomerDetailsResponse();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setPhone(u.getPhone());
        dto.setAddress(u.getAddress());
        dto.setRegistrationDate(u.getCreatedAt());
        dto.setLastLogin(u.getLastLogin());
        dto.setTotalBookings(bookingRepository.countByUser_Id(u.getId()));
        dto.setCompletedBookings(bookingRepository.countByUser_IdAndStatus(u.getId(), "COMPLETED") + bookingRepository.countByUser_IdAndStatus(u.getId(), "REVIEWED"));
        dto.setPendingBookings(bookingRepository.countByUser_IdAndStatus(u.getId(), "PENDING"));
        dto.setReviewsGiven(reviewRepository.countByUser_Id(u.getId()));

        return dto;
    }

    public List<TechnicianDetailsResponse> getTechnicianProfiles() {
        List<Technician> technicians = technicianRepository.findAll();
        List<TechnicianDetailsResponse> list = new ArrayList<>();

        for (Technician t : technicians) {
            TechnicianDetailsResponse dto = new TechnicianDetailsResponse();
            dto.setId(t.getId());
            if (t.getUser() != null) {
                dto.setUserId(t.getUser().getId());
                dto.setEmail(t.getUser().getEmail());
            }
            dto.setName(t.getName());
            dto.setPhone(t.getPhone());
            dto.setSkills(t.getSkills());
            dto.setExperience(t.getExperience());
            dto.setRating(t.getRating());
            dto.setAvailable(t.isAvailable());
            dto.setAssignedJobs(bookingRepository.countByTechnician_Id(t.getId()));
            dto.setCompletedJobs(bookingRepository.countByTechnician_IdAndStatus(t.getId(), "COMPLETED") + bookingRepository.countByTechnician_IdAndStatus(t.getId(), "REVIEWED"));
            dto.setPhotoUrl("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80");
            list.add(dto);
        }
        return list;
    }
}

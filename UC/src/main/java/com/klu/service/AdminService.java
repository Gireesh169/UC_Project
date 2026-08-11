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

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private BookingRepository bookingRepository;

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
        long completedJobs = bookingRepository.countByStatus("COMPLETED") + bookingRepository.countByStatus("REVIEWED");

        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        long bookingsToday = bookingRepository.countBookingsAfter(todayStart);

        double totalRevenue = bookingRepository.calculateTotalRevenue();

        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        double monthlyRevenue = bookingRepository.calculateRevenueAfter(monthStart);

        stats.put("totalUsers", totalUsers);
        stats.put("totalTechnicians", totalTechnicians);
        stats.put("totalBookings", totalBookings);
        stats.put("pendingBookings", pendingBookings);
        stats.put("completedJobs", completedJobs);
        stats.put("bookingsToday", bookingsToday);
        stats.put("totalRevenue", totalRevenue);
        stats.put("monthlyRevenue", monthlyRevenue);

        return stats;
    }
}

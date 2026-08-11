package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.klu.dto.CreateTechnicianRequest;
import com.klu.model.Technician;
import com.klu.model.User;
import com.klu.service.AdminService;
import com.klu.service.AuditLogService;
import com.klu.service.UserService;

import jakarta.validation.Valid;
import java.util.Map;

import com.klu.dto.CustomerDetailsResponse;
import com.klu.dto.TechnicianDetailsResponse;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuditLogService auditLogService;

    // PART 3: Admin Creates Technician Accounts
    @PostMapping("/technicians")
    public ResponseEntity<Technician> createTechnician(
            @Valid @RequestBody CreateTechnicianRequest request,
            Authentication authentication) {
        String adminEmail = authentication != null ? authentication.getName() : "admin@b1kservices.com";
        Technician technician = adminService.createTechnicianAccount(request, adminEmail);
        return ResponseEntity.ok(technician);
    }

    // Enriched Technician Profiles for Admin
    @GetMapping("/technicians/details")
    public ResponseEntity<List<TechnicianDetailsResponse>> getTechnicianProfiles() {
        return ResponseEntity.ok(adminService.getTechnicianProfiles());
    }

    // Customer Profiles for Admin
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerDetailsResponse>> getCustomers() {
        return ResponseEntity.ok(adminService.getCustomerProfiles());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<CustomerDetailsResponse> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCustomerById(id));
    }

    // PART 11: Admin Dashboard Analytics
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> stats = adminService.getDashboardAnalytics();
        return ResponseEntity.ok(stats);
    }

    // PART 16: Audit Logs
    @GetMapping("/audit-logs")
    public ResponseEntity<?> getAuditLogs() {
        return ResponseEntity.ok(auditLogService.getRecentLogs());
    }

    // Toggle User Status (Disable / Enable)
    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<User> toggleUserStatus(@PathVariable Long userId) {
        User user = userService.toggleUserStatus(userId);
        return ResponseEntity.ok(user);
    }
}

package com.klu.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.klu.model.User;
import com.klu.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@b1kservices.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@123}")
    private String adminPassword;

    @Value("${app.admin.name:System Administrator}")
    private String adminName;

    @Value("${app.admin.phone:9999999999}")
    private String adminPhone;

    @Value("${app.admin.address:Headquarters}")
    private String adminAddress;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName(adminName);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setPhone(adminPhone);
            admin.setAddress(adminAddress);
            admin.setRole("admin"); // Mapped to ROLE_ADMIN
            admin.setEnabled(true);

            userRepository.save(admin);
            System.out.println(">>> [INITIALIZER] Default Administrator initialized successfully: " + adminEmail);
        } else {
            System.out.println(">>> [INITIALIZER] Administrator account already exists: " + adminEmail);
        }
    }
}

package com.klu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications")
@Data
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    private String address;

    @Column(nullable = false)
    private String password; // Stored pre-encrypted using BCrypt

    @Column(nullable = false)
    private String otp; // 6-digit numeric OTP

    private LocalDateTime createdAt;

    private LocalDateTime expiryTime; // Valid for 10 minutes

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.expiryTime == null) {
            this.expiryTime = LocalDateTime.now().plusMinutes(10);
        }
    }
}

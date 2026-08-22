package com.klu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "services")
@Data
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // AC Repair
    private String description;
    private double basePrice;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private boolean active = true;

    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime updatedAt;

    @jakarta.persistence.PrePersist
    public void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
        this.updatedAt = java.time.LocalDateTime.now();
    }

    @jakarta.persistence.PreUpdate
    public void onUpdate() {
        this.updatedAt = java.time.LocalDateTime.now();
    }
}
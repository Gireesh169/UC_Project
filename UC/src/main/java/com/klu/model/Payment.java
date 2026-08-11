package com.klu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "payments")
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String method; // UPI, CARD, RAZORPAY, STRIPE, CASH
    private String status; // SUCCESS, PENDING, FAILED
    private String transactionId;
    private String invoiceNumber;
    private String receiptUrl;
    private java.time.LocalDateTime createdAt;

    @jakarta.persistence.PrePersist
    public void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
        if (this.invoiceNumber == null) {
            this.invoiceNumber = "INV-" + System.currentTimeMillis();
        }
        if (this.transactionId == null) {
            this.transactionId = "TXN-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
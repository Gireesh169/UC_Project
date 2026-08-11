package com.klu.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "support_tickets")
@Data
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String priority; // LOW, MEDIUM, HIGH, URGENT

    private String status; // OPEN, IN_PROGRESS, RESOLVED, CLOSED

    private LocalDateTime createdDate;
    private LocalDateTime resolvedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    @PrePersist
    public void onCreate() {
        this.createdDate = LocalDateTime.now();
        if (this.status == null) {
            this.status = "OPEN";
        }
        if (this.priority == null) {
            this.priority = "MEDIUM";
        }
    }
}

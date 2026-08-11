package com.klu.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CustomerDetailsResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime registrationDate;
    private LocalDateTime lastLogin;
    private long totalBookings;
    private long completedBookings;
    private long pendingBookings;
    private long reviewsGiven;
}

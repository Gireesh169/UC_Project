package com.klu.dto;

import lombok.Data;

@Data
public class TechnicianDetailsResponse {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String skills;
    private int experience;
    private double rating;
    private boolean available;
    private long assignedJobs;
    private long completedJobs;
    private String photoUrl;
}

package com.klu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueRequestDTO {

    @NotBlank(message = "Issue title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @Min(value = 0, message = "Price cannot be negative")
    private double price;

    private String imageUrl;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    private Boolean active;
}

package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.model.Technician;
import com.klu.service.TechnicianService;

@RestController
@RequestMapping("/technicians")
@CrossOrigin("*")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    @PostMapping
    public Technician create(@RequestBody Technician technician) {

        return technicianService.createTechnician(technician);
    }

    @GetMapping("/all")
    public List<Technician> getAllTechnicians() {

        return technicianService.getAllTechnicians();
    }

    @GetMapping("/available/{skills}")
    public List<Technician> getAvailable(
            @PathVariable String skills) {

        return technicianService.getAvailableTechnicians(skills);
    }

    @GetMapping("/user/{userId}")
    public Technician getByUserId(
            @PathVariable Long userId) {

        return technicianService.getByUserId(userId);
    }

    @PutMapping("/update/{id}")
    public Technician updateTechnician(
            @PathVariable Long id,
            @RequestBody Technician updatedTechnician) {

        return technicianService.updateTechnician(
                id,
                updatedTechnician
        );
    }
}
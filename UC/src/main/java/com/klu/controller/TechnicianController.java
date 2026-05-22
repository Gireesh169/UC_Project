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

    @GetMapping
    public List<Technician> getAll() {
        return technicianService.getAllTechnicians();
    }
    @GetMapping("/available")
    public List<Technician> getAvailable(@RequestBody String skills) {
        return technicianService.getAvailableTechnicians(skills);
    }
}
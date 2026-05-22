package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Technician;
import com.klu.repository.TechnicianRepository;

@Service
public class TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepo;

    public Technician createTechnician(Technician technician) {
        return technicianRepo.save(technician);
    }

    public List<Technician> getAllTechnicians() {
        return technicianRepo.findAll();
    }

    public List<Technician> getAvailableTechnicians(String skills) {
        return technicianRepo.findBySkillsContainingAndAvailableTrue(skills);
    }
}
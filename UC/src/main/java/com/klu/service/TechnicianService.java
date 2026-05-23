package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Technician;
import com.klu.repository.TechnicianRepository;

@Service
public class TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepository;

    public Technician createTechnician(Technician technician) {

        return technicianRepository.save(technician);
    }

    public List<Technician> getAllTechnicians() {

        return technicianRepository.findAll();
    }

    public List<Technician> getAvailableTechnicians(String skills) {

        return technicianRepository.findBySkillsContainingAndAvailableTrue(skills);
    }

    public Technician getByUserId(Long userId) {

        return technicianRepository.findByUserId(userId)
                .orElse(null);
    }

    public Technician updateTechnician(
            Long id,
            Technician updatedTechnician) {

        Technician technician =
                technicianRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Technician not found"));

        technician.setName(updatedTechnician.getName());
        technician.setPhone(updatedTechnician.getPhone());
        technician.setSkills(updatedTechnician.getSkills());
        technician.setExperience(updatedTechnician.getExperience());
        technician.setAvailable(updatedTechnician.isAvailable());

        return technicianRepository.save(technician);
    }
}
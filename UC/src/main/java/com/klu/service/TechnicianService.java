package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Technician;
import com.klu.model.User;
import com.klu.repository.TechnicianRepository;
import com.klu.repository.UserRepository;

@Service
public class TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private UserRepository userRepository;

    public Technician createTechnician(Technician technician) {
        if (technician.getUser() != null && technician.getUser().getId() != null) {
            User user = userRepository.findById(technician.getUser().getId()).orElse(null);
            technician.setUser(user);
        }
        return technicianRepository.save(technician);
    }

    public List<Technician> getAllTechnicians() {

        return technicianRepository.findAll();
    }

    public List<Technician> getAvailableTechnicians(String skills) {

        return technicianRepository.findBySkillsContainingAndAvailableTrue(skills);
    }

    public Technician getByUserId(Long userId) {
        Technician tech = technicianRepository.findByUserId(userId).orElse(null);
        if (tech != null) {
            return tech;
        }

        // Fallback: Check if User exists and match technician by name
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && user.getName() != null) {
            List<Technician> list = technicianRepository.findByNameIgnoreCase(user.getName());
            if (!list.isEmpty()) {
                Technician matched = list.get(0);
                if (matched.getUser() == null) {
                    matched.setUser(user);
                    return technicianRepository.save(matched);
                }
                return matched;
            }
        }
        return null;
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
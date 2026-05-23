package com.klu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.Technician;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {

	List<Technician> findBySkillsContainingAndAvailableTrue(String skills);

	Optional<Technician> findByUserId(Long userId);
	

	}
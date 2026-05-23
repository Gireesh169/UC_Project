package com.klu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUser_Id(Long userId);
    List<Booking> findByTechnicianId(Long technicianId);
	List<Booking> findByStatus(String string);
    
}
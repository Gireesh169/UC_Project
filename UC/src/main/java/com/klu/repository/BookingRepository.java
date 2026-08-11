package com.klu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUser_Id(Long userId);
    List<Booking> findByTechnicianId(Long technicianId);
    List<Booking> findByTechnician_IdOrTechnician_User_Id(Long technicianId, Long userId);
	List<Booking> findByStatus(String string);
	List<Booking> findByStatusNot(String status);
	
	long countByStatus(String status);
	
	@org.springframework.data.jpa.repository.Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingDate >= :startDate")
	long countBookingsAfter(@org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate);

	@org.springframework.data.jpa.repository.Query("SELECT COALESCE(SUM(b.totalPrice), 0.0) FROM Booking b WHERE b.status = 'COMPLETED' OR b.status = 'REVIEWED'")
	double calculateTotalRevenue();

	@org.springframework.data.jpa.repository.Query("SELECT COALESCE(SUM(b.totalPrice), 0.0) FROM Booking b WHERE (b.status = 'COMPLETED' OR b.status = 'REVIEWED') AND b.bookingDate >= :startDate")
	double calculateRevenueAfter(@org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate);

	boolean existsByService_Id(Long serviceId);
	boolean existsByIssue_Id(Long issueId);

	long countByUser_Id(Long userId);
	long countByUser_IdAndStatus(Long userId, String status);

	long countByTechnician_Id(Long technicianId);
	long countByTechnician_IdAndStatus(Long technicianId, String status);
}
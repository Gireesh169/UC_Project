package com.klu.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Booking;
import com.klu.model.Issue;
import com.klu.model.ServiceEntity;
import com.klu.model.Technician;
import com.klu.model.User;
import com.klu.repository.BookingRepository;
import com.klu.repository.IssueRepository;
import com.klu.repository.ServiceRepository;
import com.klu.repository.TechnicianRepository;
import com.klu.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private IssueRepository issueRepository;


    public Booking createBooking(
            Long userId,
            Long serviceId,
            Long issueId,
            String address) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        Booking booking = new Booking();

        booking.setUser(user);

        booking.setService(service);

        booking.setIssue(issue);

        booking.setAddress(address);

        booking.setTotalPrice(issue.getPrice());

       
        booking.setStatus("PENDING");
        booking.setBookingDate(LocalDateTime.now());        
        booking.setTechnician(null);

        return bookingRepository.save(booking);
    }
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUser_Id(userId); 
    }

    public List<Booking> getTechnicianBookings(Long technicianId) {
        return bookingRepository.findByTechnicianId(technicianId); 
    }

    public Booking updateStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
    public Booking assignTechnician(
            Long bookingId,
            Long technicianId) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        Technician technician = technicianRepository
                .findById(technicianId)
                .orElseThrow(() ->
                        new RuntimeException("Technician not found"));

        booking.setTechnician(technician);

        booking.setStatus("ASSIGNED");

        return bookingRepository.save(booking);
    }
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }
    public List<Booking> getBookingsByTechnician(
            Long technicianId) {

        return bookingRepository
                .findByTechnicianId(technicianId);
    }
    public List<Booking> getPendingBookings() {

        return bookingRepository.findByStatus("PENDING");
    }
    public List<Booking> getBookingHistory() {
        return bookingRepository.findAll();
    }
}
package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.model.Booking;
import com.klu.service.BookingService;

@RestController
@RequestMapping("/booking")
@CrossOrigin 
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping
    public Booking createBooking(
            @RequestParam Long userId,
            @RequestParam Long serviceId,
            @RequestParam Long issueId,
            @RequestParam String address) {

        return bookingService.createBooking(userId, serviceId, issueId, address);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    @GetMapping("/technician/{technicianId}")
    public List<Booking> getTechnicianBookings(@PathVariable Long technicianId) {
        return bookingService.getTechnicianBookings(technicianId);
    }

    @PutMapping("/{bookingId}/status")
    public Booking updateStatus(
            @PathVariable Long bookingId,
            @RequestParam String status) {

        return bookingService.updateStatus(bookingId, status);
    }

    @DeleteMapping("/{bookingId}")
    public String deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return "Booking deleted successfully";
    }
}
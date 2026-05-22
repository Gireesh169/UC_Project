package com.klu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klu.model.Booking;
import com.klu.service.BookingService;

@RestController
@RequestMapping("/booking")
@CrossOrigin("http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping("/create")
   
    public Booking createBooking(@RequestBody Map<String, Object> request) {

        Long userId = Long.valueOf(request.get("userId").toString());
        Long serviceId = Long.valueOf(request.get("serviceId").toString());
        Long issueId = Long.valueOf(request.get("issueId").toString());
        String address = request.get("address").toString();

        return bookingService.createBooking(
                userId,
                serviceId,
                issueId,
                address
        );
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
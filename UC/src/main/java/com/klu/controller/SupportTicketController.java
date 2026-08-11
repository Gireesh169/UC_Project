package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klu.model.SupportTicket;
import com.klu.service.SupportTicketService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    @PostMapping("/create")
    public ResponseEntity<SupportTicket> createTicket(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        String subject = request.get("subject").toString();
        String description = request.get("description").toString();
        String priority = request.containsKey("priority") && request.get("priority") != null ? request.get("priority").toString() : "MEDIUM";

        SupportTicket ticket = supportTicketService.createTicket(userId, subject, description, priority);
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportTicket>> getUserTickets(@PathVariable Long userId) {
        return ResponseEntity.ok(supportTicketService.getUserTickets(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SupportTicket>> getAllTickets() {
        return ResponseEntity.ok(supportTicketService.getAllTickets());
    }

    @PutMapping("/{ticketId}/status")
    public ResponseEntity<SupportTicket> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestParam String status,
            @RequestParam(required = false) Long adminId) {
        SupportTicket ticket = supportTicketService.updateTicketStatus(ticketId, status, adminId);
        return ResponseEntity.ok(ticket);
    }
}

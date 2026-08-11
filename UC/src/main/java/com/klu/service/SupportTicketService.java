package com.klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.SupportTicket;
import com.klu.model.User;
import com.klu.repository.SupportTicketRepository;
import com.klu.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    public SupportTicket createTicket(Long userId, String subject, String description, String priority) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        SupportTicket ticket = new SupportTicket();
        ticket.setUser(user);
        ticket.setSubject(subject);
        ticket.setDescription(description);
        if (priority != null && !priority.trim().isEmpty()) {
            ticket.setPriority(priority.toUpperCase());
        }
        ticket.setStatus("OPEN");

        SupportTicket savedTicket = supportTicketRepository.save(ticket);
        notificationService.createNotification(user, "Support Ticket Raised", "Your ticket #" + savedTicket.getId() + " has been created.", "SUPPORT");
        return savedTicket;
    }

    public List<SupportTicket> getUserTickets(Long userId) {
        return supportTicketRepository.findByUserId(userId);
    }

    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    public SupportTicket updateTicketStatus(Long ticketId, String status, Long adminId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        ticket.setStatus(status.toUpperCase());
        if (adminId != null) {
            User admin = userRepository.findById(adminId).orElse(null);
            ticket.setAssignedTo(admin);
        }
        if ("RESOLVED".equalsIgnoreCase(status) || "CLOSED".equalsIgnoreCase(status)) {
            ticket.setResolvedDate(LocalDateTime.now());
        }

        SupportTicket saved = supportTicketRepository.save(ticket);
        if (ticket.getUser() != null) {
            notificationService.createNotification(ticket.getUser(), "Ticket Update", "Ticket #" + ticketId + " status updated to " + status, "SUPPORT");
        }
        return saved;
    }
}

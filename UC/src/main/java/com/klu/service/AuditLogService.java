package com.klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.klu.model.AuditLog;
import com.klu.repository.AuditLogRepository;

import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Async
    public void logAction(String userEmail, String action, String details, String ipAddress) {
        try {
            AuditLog log = new AuditLog();
            log.setUserEmail(userEmail != null ? userEmail : "SYSTEM");
            log.setAction(action);
            log.setDetails(details);
            log.setIpAddress(ipAddress != null ? ipAddress : "127.0.0.1");
            auditLogRepository.save(log);
        } catch (Exception e) {
            System.err.println("Failed to log audit event: " + e.getMessage());
        }
    }

    public List<AuditLog> getRecentLogs() {
        return auditLogRepository.findTop100ByOrderByTimestampDesc();
    }
}

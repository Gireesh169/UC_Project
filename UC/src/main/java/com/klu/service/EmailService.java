package com.klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(String to, String subject, String bodyHtml) {
        if (mailSender == null) {
            System.out.println(">>> [EMAIL SERVICE] (Simulated Send to " + to + ") Subject: " + subject);
            System.out.println(">>> Content:\n" + bodyHtml);
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(bodyHtml, true);
            helper.setFrom("admin@b1kservices.com");
            mailSender.send(message);
            System.out.println(">>> [EMAIL SERVICE] Sent email to " + to);
        } catch (Exception e) {
            System.err.println(">>> [EMAIL SERVICE ERROR] Failed to send email to " + to + ": " + e.getMessage());
        }
    }

    public void sendOtpEmail(String to, String name, String otp) {
        String subject = "B1K Services Email Verification";
        String html = "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>"
                + "<p>Hello <strong>" + (name != null ? name : "User") + "</strong>,</p>"
                + "<p>Thank you for registering with B1K Services.</p>"
                + "<p>Your verification code is</p>"
                + "<h2 style='color: #2563eb; letter-spacing: 4px;'>" + otp + "</h2>"
                + "<p>This code is valid for 10 minutes.</p>"
                + "<p>If you did not request this, ignore this email.</p>"
                + "<br/>"
                + "<p>Regards,<br/><strong>B1K Services Team</strong></p>"
                + "</div>";
        sendEmail(to, subject, html);
    }

    public void sendPasswordResetOtpEmail(String to, String name, String otp) {
        String subject = "B1K Services - Password Reset Verification Code";
        String html = "<div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f9;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>"
                + "<h2 style='color: #dc2626;'>Password Reset Request</h2>"
                + "<p>Hello " + name + ",</p>"
                + "<p>We received a request to reset your B1K Services account password. Use the code below to reset your password:</p>"
                + "<div style='text-align: center; margin: 30px 0;'>"
                + "<span style='font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #991b1b; background: #fef2f2; padding: 10px 20px; border-radius: 6px; border: 1px dashed #ef4444;'>" + otp + "</span>"
                + "</div>"
                + "<p style='color: #64748b; font-size: 14px;'>This OTP is valid for <strong>10 minutes</strong>. If you did not initiate this request, your account is safe and you can ignore this message.</p>"
                + "</div></div>";
        sendEmail(to, subject, html);
    }

    public void sendTechnicianWelcomeEmail(String to, String name, String tempPassword) {
        String subject = "Welcome to B1K Services - Technician Credentials";
        String html = "<div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f9;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>"
                + "<h2 style='color: #059669;'>Technician Account Created</h2>"
                + "<p>Hello <strong>" + name + "</strong>,</p>"
                + "<p>An administrator has created a Technician account for you at B1K Services.</p>"
                + "<div style='background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;'>"
                + "<p style='margin: 5px 0;'><strong>Login Email:</strong> " + to + "</p>"
                + "<p style='margin: 5px 0;'><strong>Temporary Password:</strong> <code style='background: #d1fae5; padding: 2px 6px; border-radius: 4px;'>" + tempPassword + "</code></p>"
                + "</div>"
                + "<p>Please log in to your Technician Portal and change your password immediately.</p>"
                + "</div></div>";
        sendEmail(to, subject, html);
    }

    public void sendBookingNotificationEmail(String to, String customerName, Long bookingId, String serviceName, String status) {
        String subject = "B1K Services - Booking #" + bookingId + " Update: " + status;
        String html = "<div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f9;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>"
                + "<h3 style='color: #2563eb;'>Booking Update Notification</h3>"
                + "<p>Hello " + customerName + ",</p>"
                + "<p>Your booking <strong>#" + bookingId + "</strong> for <strong>" + serviceName + "</strong> has been updated to status: <span style='font-weight: bold; color: #1d4ed8;'>" + status + "</span>.</p>"
                + "<p>Thank you for choosing B1K Services!</p>"
                + "</div></div>";
        sendEmail(to, subject, html);
    }
}

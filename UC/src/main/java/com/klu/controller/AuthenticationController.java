package com.klu.controller;

import com.klu.dto.*;
import com.klu.model.User;
import com.klu.repository.UserRepository;
import com.klu.service.JwtService;
import com.klu.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    // 1) POST /auth/send-otp (Stores registration in OtpVerification table, DO NOT save User)
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody SignupRequest request) {
        userService.sendOtp(request);
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
    }

    // 2) POST /auth/verify-otp (Verifies OTP, Creates User, Purges OtpVerification record)
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        userService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(Map.of("message", "Registration Successful"));
    }

    // 3) POST /auth/resend-otp
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        userService.resendOtp(email);
        return ResponseEntity.ok(Map.of("message", "OTP resent successfully"));
    }

    // Retain /auth/signup & /auth/verify-email mappings for backwards compatibility
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        userService.sendOtp(request);
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody VerifyOtpRequest request) {
        userService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(Map.of("message", "Registration Successful"));
    }

    // Login with Lockout & Refresh Token support
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return ResponseEntity.ok(new LoginResponse(accessToken, refreshToken, user));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String username = jwtService.extractUsername(request.getRefreshToken());
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (jwtService.isTokenValid(request.getRefreshToken(), user)) {
            String newAccessToken = jwtService.generateToken(user);
            return ResponseEntity.ok(Map.of("token", newAccessToken));
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired refresh token.");
        }
    }

    // Forgot Password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        userService.initiateForgotPassword(request.getEmail());
        return ResponseEntity.ok(Map.of("message", "Password reset OTP sent to your email."));
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<?> verifyResetOtp(@Valid @RequestBody VerifyOtpRequest request) {
        userService.verifyResetOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(Map.of("message", "OTP verified. Proceed to set your new password."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password reset successful! Please login with your new password."));
    }
}

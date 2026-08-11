package com.klu.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klu.dto.SignupRequest;
import com.klu.model.OtpVerification;
import com.klu.model.User;
import com.klu.repository.OtpVerificationRepository;
import com.klu.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpVerificationRepository otpVerificationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuditLogService auditLogService;

    @Value("${app.security.max-failed-attempts:5}")
    private int maxFailedAttempts;

    @Value("${app.security.lock-duration-minutes:15}")
    private int lockDurationMinutes;

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    /**
     * Step 1 of Signup: Send OTP & store registration data temporarily in OtpVerification table.
     * DO NOT write to User table.
     */
    @Transactional
    public void sendOtp(SignupRequest request) {
        // 1. Check if email already exists in User table
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // 2. Generate 6-digit numeric OTP
        String otp = generateOtp();

        // 3. Encrypt password with BCrypt
        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        // 4. Save or update temporary OtpVerification record
        Optional<OtpVerification> existingOtpOpt = otpVerificationRepository.findByEmail(request.getEmail());
        OtpVerification otpRecord = existingOtpOpt.orElseGet(OtpVerification::new);

        otpRecord.setName(request.getName());
        otpRecord.setEmail(request.getEmail());
        otpRecord.setPhone(request.getPhone());
        otpRecord.setAddress(request.getAddress());
        otpRecord.setPassword(encryptedPassword); // Stored pre-encrypted
        otpRecord.setOtp(otp);
        otpRecord.setCreatedAt(LocalDateTime.now());
        otpRecord.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        otpVerificationRepository.save(otpRecord);

        // 5. Send Email with OTP
        emailService.sendOtpEmail(request.getEmail(), request.getName(), otp);
        auditLogService.logAction(request.getEmail(), "OTP_SENT", "Registration OTP sent to temporary verification table", "127.0.0.1");
    }

    /**
     * Step 2 of Signup: Verify OTP and ONLY NOW create the User entity.
     */
    @Transactional
    public User verifyOtp(String email, String otp) {
        OtpVerification otpRecord = otpVerificationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid OTP"));

        // Check if OTP matches
        if (!otpRecord.getOtp().equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        // Check if OTP is expired
        if (otpRecord.getExpiryTime() != null && otpRecord.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpVerificationRepository.deleteByEmail(email);
            throw new IllegalArgumentException("OTP Expired");
        }

        // Double check email uniqueness before user creation
        if (userRepository.existsByEmail(email)) {
            otpVerificationRepository.deleteByEmail(email);
            throw new IllegalArgumentException("Email already registered");
        }

        // Create User entity
        User user = new User();
        user.setName(otpRecord.getName());
        user.setEmail(otpRecord.getEmail());
        user.setPassword(otpRecord.getPassword()); // Already BCrypt encrypted
        user.setPhone(otpRecord.getPhone());
        user.setAddress(otpRecord.getAddress());
        user.setRole("citizen"); // Mapped to ROLE_USER
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        // Purge temporary OTP record
        otpVerificationRepository.deleteByEmail(email);

        auditLogService.logAction(email, "REGISTRATION_SUCCESSFUL", "User verified OTP and account created in users table", "127.0.0.1");
        return savedUser;
    }

    /**
     * Step 3: Resend OTP for pending registration.
     */
    @Transactional
    public void resendOtp(String email) {
        OtpVerification otpRecord = otpVerificationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No pending registration found for email: " + email));

        String newOtp = generateOtp();
        otpRecord.setOtp(newOtp);
        otpRecord.setCreatedAt(LocalDateTime.now());
        otpRecord.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        otpVerificationRepository.save(otpRecord);
        emailService.sendOtpEmail(email, otpRecord.getName(), newOtp);
    }

    // Retain legacy method for backwards compatibility
    public User registerUser(SignupRequest request) {
        sendOtp(request);
        return null;
    }

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (!"admin".equalsIgnoreCase(user.getRole())) {
            user.setRole("citizen");
        }
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public boolean verifyEmail(String email, String otp) {
        verifyOtp(email, otp);
        return true;
    }

    public void resendVerificationOtp(String email) {
        resendOtp(email);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (user.isLocked()) {
            if (user.getLockTime() != null && user.getLockTime().plusMinutes(lockDurationMinutes).isBefore(LocalDateTime.now())) {
                user.setLocked(false);
                user.setFailedAttempts(0);
                user.setLockTime(null);
                userRepository.save(user);
            } else {
                throw new IllegalStateException("Account is locked due to multiple failed login attempts. Please try again after 15 minutes.");
            }
        }

        if (!user.isEnabled()) {
            throw new IllegalStateException("Account is not activated. Please verify your email.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            int newFailedAttempts = user.getFailedAttempts() + 1;
            user.setFailedAttempts(newFailedAttempts);
            if (newFailedAttempts >= maxFailedAttempts) {
                user.setLocked(true);
                user.setLockTime(LocalDateTime.now());
                auditLogService.logAction(email, "ACCOUNT_LOCKED", "Account locked after " + newFailedAttempts + " failed attempts", "127.0.0.1");
            }
            userRepository.save(user);
            throw new IllegalArgumentException("Invalid email or password");
        }

        user.setFailedAttempts(0);
        user.setLocked(false);
        user.setLockTime(null);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        auditLogService.logAction(email, "LOGIN_SUCCESS", "User logged in successfully", "127.0.0.1");
        return user;
    }

    public void initiateForgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        String otp = generateOtp();
        user.setResetOtp(otp);
        user.setResetOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        emailService.sendPasswordResetOtpEmail(user.getEmail(), user.getName(), otp);
        auditLogService.logAction(email, "FORGOT_PASSWORD_INITIATED", "Password reset OTP sent", "127.0.0.1");
    }

    public boolean verifyResetOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));

        if (user.getResetOtp() == null || !user.getResetOtp().equals(otp)) {
            throw new IllegalArgumentException("Invalid password reset OTP.");
        }

        if (user.getResetOtpExpiry() != null && user.getResetOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Password reset OTP has expired.");
        }

        return true;
    }

    public void resetPassword(String email, String otp, String newPassword) {
        verifyResetOtp(email, otp);

        User user = userRepository.findByEmail(email).get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetOtp(null);
        user.setResetOtpExpiry(null);
        user.setFailedAttempts(0);
        user.setLocked(false);
        user.setLockTime(null);

        userRepository.save(user);
        auditLogService.logAction(email, "PASSWORD_RESET_COMPLETED", "Password successfully changed", "127.0.0.1");
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        User saved = userRepository.save(user);
        auditLogService.logAction(user.getEmail(), "PROFILE_UPDATED", "Updated profile details", "127.0.0.1");
        return saved;
    }

    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));

        user.setEnabled(!user.isEnabled());
        return userRepository.save(user);
    }
}
package com.klu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klu.model.OtpVerification;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByEmail(String email);

    List<OtpVerification> findAllByEmail(String email);

    Optional<OtpVerification> findByEmailAndOtp(String email, String otp);

    @Transactional
    void deleteByEmail(String email);
}

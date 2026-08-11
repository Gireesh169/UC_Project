package com.klu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Optional<User> findByVerificationCode(String code);
    Optional<User> findByResetOtp(String otp);
    java.util.List<User> findByRole(String role);
    long countByRole(String role);
    boolean existsByEmail(String email);
}
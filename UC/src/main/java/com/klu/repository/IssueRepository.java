package com.klu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByService_Id(Long serviceId);
    List<Issue> findByService_IdAndActiveTrue(Long serviceId);
    List<Issue> findByActiveTrue();
    boolean existsByTitleIgnoreCaseAndService_Id(String title, Long serviceId);
    boolean existsByTitleIgnoreCaseAndService_IdAndIdNot(String title, Long serviceId, Long id);
}
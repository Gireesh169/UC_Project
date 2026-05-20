package com.klu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

	List<Issue> findByServiceId(Long serviceId);
}
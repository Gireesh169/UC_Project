package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Issue;
import com.klu.repository.IssueRepository;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public List<Issue> getIssuesByService(Long serviceId) {
        return issueRepository.findByServiceId(serviceId);
    }
}
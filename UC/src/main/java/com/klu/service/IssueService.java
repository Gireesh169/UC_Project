package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Issue;
import com.klu.repository.IssueRepository;

import com.klu.dto.IssueRequestDTO;
import com.klu.model.ServiceEntity;
import com.klu.repository.ServiceRepository;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public Issue createIssue(Issue issue) {
        validateIssue(issue.getTitle(), issue.getPrice(), issue.getService().getId(), null);
        issue.setActive(true);
        return issueRepository.save(issue);
    }

    public Issue createIssueFromDTO(IssueRequestDTO dto) {
        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new IllegalArgumentException("Service not found with ID: " + dto.getServiceId()));

        validateIssue(dto.getTitle(), dto.getPrice(), dto.getServiceId(), null);

        Issue issue = new Issue();
        issue.setTitle(dto.getTitle().trim());
        issue.setDescription(dto.getDescription());
        issue.setPrice(dto.getPrice());
        issue.setImageUrl(dto.getImageUrl());
        issue.setService(service);
        issue.setActive(dto.getActive() != null ? dto.getActive() : true);

        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public List<Issue> getIssuesByService(Long serviceId) {
        return issueRepository.findByService_Id(serviceId);
    }

    public List<Issue> getActiveIssuesByService(Long serviceId) {
        return issueRepository.findByService_IdAndActiveTrue(serviceId);
    }

    public Issue getIssueById(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Issue not found with ID: " + id));
    }

    public Issue updateIssue(Long id, IssueRequestDTO dto) {
        Issue existing = getIssueById(id);
        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new IllegalArgumentException("Service not found with ID: " + dto.getServiceId()));

        validateIssue(dto.getTitle(), dto.getPrice(), dto.getServiceId(), id);

        existing.setTitle(dto.getTitle().trim());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        if (dto.getImageUrl() != null) {
            existing.setImageUrl(dto.getImageUrl());
        }
        existing.setService(service);
        if (dto.getActive() != null) {
            existing.setActive(dto.getActive());
        }

        return issueRepository.save(existing);
    }

    public Issue toggleIssueStatus(Long id, Boolean active) {
        Issue existing = getIssueById(id);
        if (active != null) {
            existing.setActive(active);
        } else {
            existing.setActive(!existing.isActive());
        }
        return issueRepository.save(existing);
    }

    public Issue softDeleteIssue(Long id) {
        Issue existing = getIssueById(id);
        existing.setActive(false);
        return issueRepository.save(existing);
    }

    private void validateIssue(String title, double price, Long serviceId, Long currentId) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Issue title cannot be empty");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Issue price cannot be negative");
        }
        boolean duplicate = (currentId == null)
                ? issueRepository.existsByTitleIgnoreCaseAndService_Id(title.trim(), serviceId)
                : issueRepository.existsByTitleIgnoreCaseAndService_IdAndIdNot(title.trim(), serviceId, currentId);
        if (duplicate) {
            throw new IllegalArgumentException("An issue with title '" + title.trim() + "' already exists for this service");
        }
    }
}
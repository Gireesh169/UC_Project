package com.klu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klu.model.Issue;
import com.klu.model.ServiceEntity;
import com.klu.repository.ServiceRepository;
import com.klu.service.IssueService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import com.klu.dto.IssueRequestDTO;

@RestController
@RequestMapping("/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/create")
    public ResponseEntity<Issue> createIssue(@Valid @RequestBody IssueRequestDTO dto) {
        return ResponseEntity.ok(issueService.createIssueFromDTO(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.getIssueById(id));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Issue>> getIssuesByService(
            @PathVariable Long serviceId,
            @RequestParam(required = false, defaultValue = "false") boolean includeInactive) {
        if (includeInactive) {
            return ResponseEntity.ok(issueService.getIssuesByService(serviceId));
        } else {
            return ResponseEntity.ok(issueService.getActiveIssuesByService(serviceId));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Issue> updateIssue(
            @PathVariable Long id,
            @Valid @RequestBody IssueRequestDTO dto) {
        return ResponseEntity.ok(issueService.updateIssue(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Issue> deleteIssue(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.softDeleteIssue(id));
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<Issue> updateStatus(
            @PathVariable Long id,
            @RequestParam(required = false) Boolean active) {
        return ResponseEntity.ok(issueService.toggleIssueStatus(id, active));
    }
}
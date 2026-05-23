package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klu.model.Issue;
import com.klu.service.IssueService;

@RestController
@RequestMapping("/issues")
@CrossOrigin("*")
public class IssueController {
	
	@Autowired
	private IssueService issueservice;
	
	@PostMapping("/create")
	public Issue createIssue(Issue issue) {
		return issueservice.createIssue(issue);
	}
	@GetMapping("/service/{serviceId}")
	public List<Issue> getIssuesByService(
	        @PathVariable Long serviceId) {

	    return issueservice.getIssuesByService(serviceId);
	}

}

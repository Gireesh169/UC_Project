package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	

}

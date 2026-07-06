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
@RestController
@RequestMapping("/issues")
@CrossOrigin("*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/create")
    public Issue createIssue(@RequestBody Map<String,Object> request){

        Issue issue=new Issue();

        issue.setTitle(request.get("title").toString());

        issue.setDescription(request.get("description").toString());

        issue.setPrice(
                Double.parseDouble(request.get("price").toString())
        );

        Long serviceId=
                Long.parseLong(request.get("serviceId").toString());

        ServiceEntity service=
                serviceRepository.findById(serviceId).get();

        issue.setService(service);

        return issueService.createIssue(issue);

    }

    @GetMapping("/service/{serviceId}")
    public List<Issue> getIssuesByService(
            @PathVariable Long serviceId){

        return issueService.getIssuesByService(serviceId);

    }

}
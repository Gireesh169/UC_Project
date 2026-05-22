package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.model.ServiceEntity;
import com.klu.service.ServiceEntityService;

@RestController
@RequestMapping("/services")
@CrossOrigin("*")
public class ServiceEntityController {

    @Autowired
    private ServiceEntityService serviceService;

    @PostMapping("/create")
    public ServiceEntity create(@RequestBody ServiceEntity service) {
        return serviceService.createService(service);
    }

    @GetMapping
    public List<ServiceEntity> getAll() {
        return serviceService.getAllServices();
    }
}
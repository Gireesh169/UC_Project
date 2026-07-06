package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/all")
    public List<ServiceEntity> getAll() {
        return serviceService.getAllServices();
    }
    @GetMapping("/{id}")
    public ServiceEntity getById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }
}
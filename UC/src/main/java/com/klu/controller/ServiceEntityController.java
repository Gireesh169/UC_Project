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

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import com.klu.dto.ServiceRequestDTO;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceEntityController {

    @Autowired
    private ServiceEntityService serviceService;

    @PostMapping("/create")
    public ResponseEntity<ServiceEntity> create(@Valid @RequestBody ServiceRequestDTO dto) {
        return ResponseEntity.ok(serviceService.createServiceFromDTO(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ServiceEntity>> getAll() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/active")
    public ResponseEntity<List<ServiceEntity>> getActive() {
        return ResponseEntity.ok(serviceService.getActiveServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceEntity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServiceEntity> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequestDTO dto) {
        return ResponseEntity.ok(serviceService.updateService(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceEntity> deleteService(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.deleteService(id));
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<ServiceEntity> updateStatus(
            @PathVariable Long id,
            @RequestParam(required = false) Boolean active) {
        return ResponseEntity.ok(serviceService.toggleServiceStatus(id, active));
    }
}
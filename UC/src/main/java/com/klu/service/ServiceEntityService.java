package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.ServiceEntity;
import com.klu.repository.ServiceRepository;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceRepository serviceRepository;

    public ServiceEntity createService(ServiceEntity service) {
        return serviceRepository.save(service);
    }

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }
}
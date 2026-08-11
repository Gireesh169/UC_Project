package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.ServiceEntity;
import com.klu.repository.ServiceRepository;

import com.klu.dto.ServiceRequestDTO;
import com.klu.repository.BookingRepository;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public ServiceEntity createService(ServiceEntity service) {
        validateService(service.getName(), service.getBasePrice(), null);
        service.setActive(true);
        return serviceRepository.save(service);
    }

    public ServiceEntity createServiceFromDTO(ServiceRequestDTO dto) {
        validateService(dto.getName(), dto.getBasePrice(), null);
        ServiceEntity service = new ServiceEntity();
        service.setName(dto.getName().trim());
        service.setDescription(dto.getDescription());
        service.setBasePrice(dto.getBasePrice());
        service.setImageUrl(dto.getImageUrl());
        service.setActive(dto.getActive() != null ? dto.getActive() : true);
        return serviceRepository.save(service);
    }

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<ServiceEntity> getActiveServices() {
        return serviceRepository.findByActiveTrue();
    }

    public ServiceEntity getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with ID: " + id));
    }

    public ServiceEntity updateService(Long id, ServiceRequestDTO dto) {
        ServiceEntity existing = getServiceById(id);
        validateService(dto.getName(), dto.getBasePrice(), id);

        existing.setName(dto.getName().trim());
        existing.setDescription(dto.getDescription());
        existing.setBasePrice(dto.getBasePrice());
        if (dto.getImageUrl() != null) {
            existing.setImageUrl(dto.getImageUrl());
        }
        if (dto.getActive() != null) {
            existing.setActive(dto.getActive());
        }
        return serviceRepository.save(existing);
    }

    public ServiceEntity toggleServiceStatus(Long id, Boolean status) {
        ServiceEntity existing = getServiceById(id);
        if (status != null) {
            existing.setActive(status);
        } else {
            existing.setActive(!existing.isActive());
        }
        return serviceRepository.save(existing);
    }

    public ServiceEntity deleteService(Long id) {
        ServiceEntity existing = getServiceById(id);
        // Soft delete: set active = false so existing bookings/references remain intact
        existing.setActive(false);
        return serviceRepository.save(existing);
    }

    private void validateService(String name, double basePrice, Long currentId) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Service name cannot be empty");
        }
        if (basePrice < 0) {
            throw new IllegalArgumentException("Base price cannot be negative");
        }
        boolean duplicate = (currentId == null)
                ? serviceRepository.existsByNameIgnoreCase(name.trim())
                : serviceRepository.existsByNameIgnoreCaseAndIdNot(name.trim(), currentId);
        if (duplicate) {
            throw new IllegalArgumentException("A service with name '" + name.trim() + "' already exists");
        }
    }
}
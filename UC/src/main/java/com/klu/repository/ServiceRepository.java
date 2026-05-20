package com.klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.model.ServiceEntity;



@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long>{
	
}
package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ServiceOffering;

@Repository 
public interface ServiceOfferingRepository 
	extends JpaRepository<ServiceOffering, Integer> {

    Optional<ServiceOffering> findByName(String name);
}

package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ServiceFrequency;

@Repository 
public interface ServiceFrequencyRepository 
	extends JpaRepository<ServiceFrequency, Integer> {

    Optional<ServiceFrequency> findByName(String name);

}

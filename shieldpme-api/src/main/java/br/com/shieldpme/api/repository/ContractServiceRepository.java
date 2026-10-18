package br.com.shieldpme.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ContractService;

@Repository 
public interface ContractServiceRepository 
	extends JpaRepository<ContractService, Integer> {

    List<ContractService> findByContractId(Integer contractId);

    List<ContractService> findByServiceId(Integer serviceId);
    
    List<ContractService> findBySiteId(Integer siteId);

    List<ContractService> findByfrequencyId(Integer frequencyId);
}

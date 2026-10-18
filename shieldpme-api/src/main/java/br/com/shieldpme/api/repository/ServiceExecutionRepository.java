package br.com.shieldpme.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ServiceExecution;

@Repository
public interface ServiceExecutionRepository
        extends JpaRepository<ServiceExecution, Integer> {

    List<ServiceExecution> findByContractServiceId(Integer contractServiceId);

    List<ServiceExecution> findByContractServiceIdAndExecutionNumber(
            Integer contractServiceId,
            Short executionNumber
    );

    List<ServiceExecution> findByStatus(String status);
}


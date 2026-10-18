package br.com.shieldpme.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ExecutionAssignment;

@Repository 
public interface ExecutionAssaignmentRepository
	extends JpaRepository<ExecutionAssignment, Integer> {

    List<ExecutionAssignment> findByServiceExecutionId(Integer serviceExecutionId);

    List<ExecutionAssignment> findByEmployeeId(Integer employeeId);
}

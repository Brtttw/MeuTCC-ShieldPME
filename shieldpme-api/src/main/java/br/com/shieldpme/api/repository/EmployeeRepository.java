package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Employee;

@Repository 
public interface EmployeeRepository 
	extends JpaRepository<Employee, Integer> {

    Optional<Employee> findByName(String name);

    Optional<Employee> findByEmail(String email);

    List<Employee> findByPhone(String phone);

    List<Employee> findByIsActive(boolean isActive);

}

package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService extends AbstractCrudService<Employee> {
    public EmployeeService(EmployeeRepository repository) {
        super(repository);
    }
}

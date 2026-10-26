package br.com.shieldpme.api.service;

import org.springframework.stereotype.Service;

import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.exception.AccessForbiddenException;
import br.com.shieldpme.api.repository.EmployeeRepository;
import br.com.shieldpme.api.security.AuthUser;

/** Liga o usuario autenticado (papel EMPLOYEE) ao seu cadastro de funcionario ATIVO (mesmo e-mail). */
@Service
public class StaffAccessService {
    private final EmployeeRepository employees;

    public StaffAccessService(EmployeeRepository employees) { this.employees = employees; }

    public Employee requireActiveEmployee(AuthUser user) {
        Employee employee = employees.findByEmail(AuthenticationService.normalizeEmail(user.email()))
                .orElseThrow(() -> new AccessForbiddenException("Cadastro de funcionário não encontrado."));
        if (!employee.isActive()) throw new AccessForbiddenException("Funcionário inativo.");
        return employee;
    }
}

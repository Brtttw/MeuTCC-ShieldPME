package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ExecutionAssignment;
import br.com.shieldpme.api.repository.ExecutionAssaignmentRepository;
import org.springframework.stereotype.Service;

@Service
public class ExecutionAssignmentService extends AbstractCrudService<ExecutionAssignment> {
    public ExecutionAssignmentService(ExecutionAssaignmentRepository repository) {
        super(repository);
    }
}

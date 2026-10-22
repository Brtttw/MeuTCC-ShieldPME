package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ServiceExecution;
import br.com.shieldpme.api.repository.ServiceExecutionRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceExecutionService extends AbstractCrudService<ServiceExecution> {
    public ServiceExecutionService(ServiceExecutionRepository repository) {
        super(repository);
    }
}

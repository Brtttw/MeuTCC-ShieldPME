package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ContractService;
import br.com.shieldpme.api.repository.ContractServiceRepository;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceService extends AbstractCrudService<ContractService> {
    public ContractServiceService(ContractServiceRepository repository) {
        super(repository);
    }
}

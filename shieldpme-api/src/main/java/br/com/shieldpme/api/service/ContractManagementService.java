package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Contract;
import br.com.shieldpme.api.repository.ContractRepository;
import org.springframework.stereotype.Service;

@Service
public class ContractManagementService extends AbstractCrudService<Contract> {
    public ContractManagementService(ContractRepository repository) {
        super(repository);
    }
}

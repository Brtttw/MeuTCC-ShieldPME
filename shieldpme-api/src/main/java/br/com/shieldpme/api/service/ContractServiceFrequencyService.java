package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ServiceFrequency;
import br.com.shieldpme.api.repository.ServiceFrequencyRepository;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceFrequencyService extends AbstractCrudService<ServiceFrequency> {
    public ContractServiceFrequencyService(ServiceFrequencyRepository repository) {
        super(repository);
    }
}

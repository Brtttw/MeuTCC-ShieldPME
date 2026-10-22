package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ServiceOffering;
import br.com.shieldpme.api.repository.ServiceOfferingRepository;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceOfferingService extends AbstractCrudService<ServiceOffering> {
    public ContractServiceOfferingService(ServiceOfferingRepository repository) {
        super(repository);
    }
}

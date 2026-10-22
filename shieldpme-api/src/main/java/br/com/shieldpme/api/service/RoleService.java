package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Role;
import br.com.shieldpme.api.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends AbstractCrudService<Role> {
    public RoleService(RoleRepository repository) {
        super(repository);
    }
}

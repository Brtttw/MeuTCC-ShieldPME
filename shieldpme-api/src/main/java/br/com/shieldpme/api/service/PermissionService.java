package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Permission;
import br.com.shieldpme.api.repository.PermissionRepository;
import org.springframework.stereotype.Service;

@Service
public class PermissionService extends AbstractCrudService<Permission> {
    public PermissionService(PermissionRepository repository) {
        super(repository);
    }
}

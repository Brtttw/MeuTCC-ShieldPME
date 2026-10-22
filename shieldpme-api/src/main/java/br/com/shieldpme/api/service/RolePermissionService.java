package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.RolePermission;
import br.com.shieldpme.api.repository.RolePermissionRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RolePermissionService {
    private final RolePermissionRepository repository;

    public RolePermissionService(RolePermissionRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<RolePermission> findAll() {
        return repository.findAll();
    }
}

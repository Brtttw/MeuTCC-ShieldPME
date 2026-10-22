package br.com.shieldpme.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.RolePermission;
import br.com.shieldpme.api.entity.RolePermissionId;

@Repository 
public interface RolePermissionRepository 
	extends JpaRepository<RolePermission, RolePermissionId> {

    Optional<RolePermission> findByRoleId(Integer roleId);

    Optional<RolePermission> findByPermissionId(Integer permissionId);
}

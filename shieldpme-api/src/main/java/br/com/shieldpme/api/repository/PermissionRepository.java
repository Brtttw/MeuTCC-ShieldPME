package br.com.shieldpme.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Permission;

@Repository 
public interface PermissionRepository 
	extends JpaRepository<Permission, Integer> {

    Optional<Permission> findByName(String name);

}

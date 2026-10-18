package br.com.shieldpme.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Role;

@Repository 
public interface RoleRepository 
	extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);


}

package br.com.shieldpme.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.RoleRepository;
import br.com.shieldpme.api.repository.UserRepository;

@Service 
public class UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final RoleRepository roleRepository;

    public UserService(
	    UserRepository userRepository,
	    CompanyRepository companyRepository, 
	    RoleRepository roleRepository) {
        this.userRepository = userRepository;
	this.companyRepository = companyRepository;
	this.roleRepository = roleRepository;
    }

    

    public User findById(Integer id) {
	return userRepository.findById(id)
	    .orElseThrow(() -> 
		new IllegalArgumentException("Usuário não encontrado com o ID " + id));
    }

    public List<User> findByCompanyId(Integer companyId) {
	return userRepository.findByCompanyId(companyId);
    }

    public User createUser(User user) {
	if (userRepository.findByEmail(user.getEmail()).isPresent()) {
	    throw new IllegalArgumentException(
		"Usuário já existente com o email " + user.getEmail());
	}

	return userRepository.save(user);
    }
}

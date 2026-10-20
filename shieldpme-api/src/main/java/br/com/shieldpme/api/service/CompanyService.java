package br.com.shieldpme.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.UserRepository;

@Service 
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyService(
	    CompanyRepository companyRepository,
	    UserRepository userRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    public Company findById(Integer id) {
	return companyRepository.findById(id)
	    .orElseThrow(() -> 
		new IllegalArgumentException("Empresa não encontrada com o ID " + id));
    }

    public List<Company> findByUserId(Integer userId) {
	userRepository.findById(userId)
	    .orElseThrow(() -> 
		new IllegalArgumentException("Usuário não encontrado com o ID " + userId));

	return companyRepository.findByUserId(userId);
    }

    public Company createCompany(Company company, Integer userId) {
	if (companyRepository.findByName(company.getName()).isPresent()) {
	    throw new IllegalArgumentException(
		"Empresa já existente com o nome " + company.getName());
	}

	if (companyRepository.findByCnpj(company.getCnpj()).isPresent()) {
	    throw new IllegalArgumentException(
		"Empresa já existente com o CNPJ " + company.getCnpj());
	}

	User user = userRepository.findById(userId)
	    .orElseThrow(() -> 
		new IllegalArgumentException("Usuário não encontrado com o ID " + userId));

	company.setUser(user);

	return companyRepository.save(company);
    }
}

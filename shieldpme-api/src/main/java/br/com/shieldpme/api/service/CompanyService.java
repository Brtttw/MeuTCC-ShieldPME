package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CompanyService {
    private final CompanyRepository companies;
    private final UserRepository users;

    public CompanyService(CompanyRepository companies, UserRepository users) {
        this.companies = companies;
        this.users = users;
    }

    @Transactional(readOnly = true)
    public List<Company> findAll() {
        return companies.findAll();
    }

    @Transactional(readOnly = true)
    public Company findById(Integer id) {
        return companies
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public List<Company> findByUserId(Integer id) {
        if (!users.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado: " + id);
        }
        return companies.findByUserId(id);
    }

    public Company create(Company c, Integer userId) {
        c.setId(null);
        if (c.getCnpj() != null && companies.findByCnpj(c.getCnpj()).isPresent()) {
            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }
        User u = users
                .findById(userId)
                .orElseThrow(
                        () -> new IllegalArgumentException("Usuário não encontrado: " + userId));
        c.setUser(u);
        return companies.save(c);
    }

    public Company update(Integer id, Company in) {
        Company c = findById(id);
        if (in.getName() != null) {
            c.setName(in.getName());
        }
        if (in.getCnpj() != null && !in.getCnpj().equals(c.getCnpj())) {
            if (companies.findByCnpj(in.getCnpj()).isPresent()) {
                throw new IllegalArgumentException("CNPJ já cadastrado.");
            }
            c.setCnpj(in.getCnpj());
        }
        return companies.save(c);
    }

    public void delete(Integer id) {
        companies.delete(findById(id));
    }
}

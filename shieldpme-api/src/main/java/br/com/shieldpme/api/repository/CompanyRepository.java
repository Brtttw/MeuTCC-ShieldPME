package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Company;

@Repository 
public interface CompanyRepository 
	extends JpaRepository<Company, Integer> {


    Optional<Company> findByName(String name);

    Optional<Company> findById(Integer id);

    Optional<Company> findByCnpj(String cnpj);

    List<Company> findByUserId(Integer userId);

    boolean existsByCnpj(String cnpj);

}

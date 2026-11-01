package br.com.shieldpme.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Contract;

@Repository 
public interface ContractRepository 
	extends JpaRepository<Contract, Integer> {

    List<Contract> findByCompanyId(Integer companyId);

    List<Contract> findByStatus(String status);

    /** Solicitacoes do cliente dono da empresa (isolamento por usuario). */
    List<Contract> findByCompanyUserIdOrderByCreatedAtDesc(Integer userId);

    /** Fila dos funcionarios: as solicitacoes mais recentes. */
    List<Contract> findTop50ByOrderByCreatedAtDesc();
}

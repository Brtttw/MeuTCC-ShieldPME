package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Report;

@Repository 
public interface ReportRepository
	extends JpaRepository<Report, Integer> {

    Optional<Report> findByTitle(String title);

    Optional<Report> findByFileName(String file_name);

    Optional<Report> findByFilePath(String file_path);

    List<Report> findByStatus(String status);

    Optional<Report> findByServiceExecutionId(Integer serviceExecutionId);

    /** Relatorios liberados das empresas do usuario (isolamento por dono da empresa). */
    @Query("select r from Report r join r.serviceExecution e join e.contractService cs join cs.contract c "
            + "join c.company co where co.user.id = :userId and r.status = 'RELEASED' and r.filePath is not null "
            + "order by r.releasedAt desc")
    List<Report> findReleasedForUser(@Param("userId") Integer userId);

    List<Report> findByServiceExecutionContractServiceContractId(Integer contractId);
}

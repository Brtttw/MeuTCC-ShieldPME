package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Report;

@Repository 
public interface ReportRepository
	extends JpaRepository<Report, Integer> {

    Optional<Report> findByTitle(String title);

    Optional<Report> findByFileName(String file_name);

    Optional<Report> findByFilePath(String file_path);

    List<Report> findByStatus(String status);
}

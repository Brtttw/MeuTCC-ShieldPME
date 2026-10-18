package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.ReportSection;

@Repository 
public interface ReportSectionRepository
	extends JpaRepository<ReportSection, Integer> {

    List<ReportSection> findByReportId(Integer reportId);

    Optional<ReportSection> findByTitle(String title);
}

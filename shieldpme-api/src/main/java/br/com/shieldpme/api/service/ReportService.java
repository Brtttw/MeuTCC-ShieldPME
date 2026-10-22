package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Report;
import br.com.shieldpme.api.repository.ReportRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportService extends AbstractCrudService<Report> {
    public ReportService(ReportRepository repository) {
        super(repository);
    }
}

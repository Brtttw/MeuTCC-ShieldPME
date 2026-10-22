package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.ReportSection;
import br.com.shieldpme.api.repository.ReportSectionRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportSectionService extends AbstractCrudService<ReportSection> {
    public ReportSectionService(ReportSectionRepository repository) {
        super(repository);
    }
}

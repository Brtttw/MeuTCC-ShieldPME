package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Site;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.SiteRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SiteService {
    private final SiteRepository sites;
    private final CompanyRepository companies;

    public SiteService(SiteRepository sites, CompanyRepository companies) {
        this.sites = sites;
        this.companies = companies;
    }

    @Transactional(readOnly = true)
    public List<Site> findAll() {
        return sites.findAll();
    }

    @Transactional(readOnly = true)
    public Site findById(Integer id) {
        return sites
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Site não encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public List<Site> findByCompanyId(Integer id) {
        if (!companies.existsById(id)) {
            throw new IllegalArgumentException("Empresa não encontrada: " + id);
        }
        return sites.findByCompanyId(id);
    }

    public Site create(Site s, Integer companyId) {
        s.setId(null);
        if (sites.findByUrl(s.getUrl()).isPresent()) {
            throw new IllegalArgumentException("URL já cadastrada.");
        }
        s.setCompany(
                companies
                        .findById(companyId)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Empresa não encontrada: " + companyId)));
        return sites.save(s);
    }

    public Site update(Integer id, Site in) {
        Site s = findById(id);
        if (in.getName() != null) {
            s.setName(in.getName());
        }
        if (in.getUrl() != null && !in.getUrl().equals(s.getUrl())) {
            if (sites.findByUrl(in.getUrl()).isPresent()) {
                throw new IllegalArgumentException("URL já cadastrada.");
            }
            s.setUrl(in.getUrl());
        }
        s.setBackendStack(in.getBackendStack());
        s.setDatabaseStack(in.getDatabaseStack());
        s.setRepositoryUrl(in.getRepositoryUrl());
        return sites.save(s);
    }

    public void delete(Integer id) {
        sites.delete(findById(id));
    }
}

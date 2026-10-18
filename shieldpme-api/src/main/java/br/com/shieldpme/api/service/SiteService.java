
package br.com.shieldpme.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.entity.Site;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.SiteRepository;

@Service
public class SiteService {

    private final SiteRepository siteRepository;
    private final CompanyRepository companyRepository;

    public SiteService(
            SiteRepository siteRepository,
            CompanyRepository companyRepository) {
        this.siteRepository = siteRepository;
        this.companyRepository = companyRepository;
    }

    public Site findById(Integer id) {
        return siteRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Site não encontrado com o ID: " + id));
    }

    public List<Site> findByCompanyId(Integer companyId) {
        companyRepository.findById(companyId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Empresa não encontrada com o ID: " + companyId));

        return siteRepository.findByCompanyId(companyId);
    }

    public Site createSite(Site site, Integer companyId) {

        if (siteRepository.findByUrl(site.getUrl()).isPresent()) {
            throw new IllegalArgumentException(
                    "Já existe um site cadastrado com esta URL.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Empresa não encontrada com o ID: " + companyId));

        site.setCompany(company);

        return siteRepository.save(site);
    }
}


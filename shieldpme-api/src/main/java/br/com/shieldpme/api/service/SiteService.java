import org.springframework.stereotype.Service;

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
}

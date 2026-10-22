package br.com.shieldpme.api.util;

import br.com.shieldpme.api.dto.CompanyResponse;
import br.com.shieldpme.api.dto.SiteResponse;
import br.com.shieldpme.api.dto.UserResponse;
import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.entity.Site;
import br.com.shieldpme.api.entity.User;

/** Mapeamentos explícitos dos recursos mais sensíveis; nunca expõe passwordHash. */
public final class DtoMapper {
    private DtoMapper() {}

    public static UserResponse toResponse(User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getPhone(),
                user.getRole() == null ? null : user.getRole().getId(),
                user.getRole() == null ? null : user.getRole().getName(),
                user.getCreatedAt(), user.getUpdatedAt());
    }

    public static CompanyResponse toResponse(Company company) {
        return new CompanyResponse(company.getId(), company.getName(), company.getCnpj(),
                company.getUser() == null ? null : company.getUser().getId(),
                company.getCreatedAt(), company.getUpdatedAt());
    }

    public static SiteResponse toResponse(Site site) {
        return new SiteResponse(site.getId(), site.getName(), site.getUrl(), site.getBackendStack(),
                site.getDatabaseStack(), site.getRepositoryUrl(),
                site.getCompany() == null ? null : site.getCompany().getId(),
                site.getCreatedAt(), site.getUpdatedAt());
    }
}

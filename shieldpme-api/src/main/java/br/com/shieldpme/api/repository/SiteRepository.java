package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Site;

@Repository 
public interface SiteRepository extends JpaRepository<Site, Integer> {
    

    Optional<Site> findByName(String name);

    Optional<Site> findByUrl(String url);

    List<Site> findByCompanyId(Integer companyId);
}

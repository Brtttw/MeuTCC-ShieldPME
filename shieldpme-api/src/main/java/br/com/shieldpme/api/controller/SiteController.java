package br.com.shieldpme.api.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import br.com.shieldpme.api.dto.SiteRequest;
import br.com.shieldpme.api.dto.SiteResponse;
import br.com.shieldpme.api.entity.Site;
import br.com.shieldpme.api.service.SiteService;
import br.com.shieldpme.api.util.DtoMapper;

@RestController
@RequestMapping("/api/sites")
@Validated
public class SiteController {
    private final SiteService siteService;
    public SiteController(SiteService siteService) { this.siteService = siteService; }

    @GetMapping public List<SiteResponse> all() { return siteService.findAll().stream().map(DtoMapper::toResponse).toList(); }
    @GetMapping("/{id}") public SiteResponse one(@PathVariable Integer id) { return DtoMapper.toResponse(siteService.findById(id)); }
    @GetMapping("/by-company/{companyId}") public List<SiteResponse> byCompany(@PathVariable Integer companyId) {
        return siteService.findByCompanyId(companyId).stream().map(DtoMapper::toResponse).toList();
    }
    @PostMapping public ResponseEntity<SiteResponse> create(@Valid @RequestBody SiteRequest request) {
        Site site = new Site(); site.setName(request.name()); site.setUrl(request.url());
        site.setBackendStack(request.backendStack()); site.setDatabaseStack(request.databaseStack());
        site.setRepositoryUrl(request.repositoryUrl());
        Site saved = siteService.create(site, request.companyId());
        return ResponseEntity.status(HttpStatus.CREATED).body(DtoMapper.toResponse(saved));
    }
    @PutMapping("/{id}") public SiteResponse update(@PathVariable Integer id, @Valid @RequestBody SiteRequest request) {
        Site site = new Site(); site.setName(request.name()); site.setUrl(request.url());
        site.setBackendStack(request.backendStack()); site.setDatabaseStack(request.databaseStack());
        site.setRepositoryUrl(request.repositoryUrl());
        return DtoMapper.toResponse(siteService.update(id, site));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Integer id) {
        siteService.delete(id); return ResponseEntity.noContent().build();
    }
}

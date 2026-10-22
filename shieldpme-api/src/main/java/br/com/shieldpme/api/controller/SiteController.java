package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.Site;
import br.com.shieldpme.api.service.SiteService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sites")
public class SiteController {
    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    @GetMapping
    public List<Site> all() {
        return siteService.findAll();
    }

    @GetMapping("/{id}")
    public Site one(@PathVariable Integer id) {
        return siteService.findById(id);
    }

    @GetMapping("/by-company/{companyId}")
    public List<Site> byCompany(@PathVariable Integer companyId) {
        return siteService.findByCompanyId(companyId);
    }

    @PostMapping
    public ResponseEntity<Site> create(@RequestParam Integer companyId, @RequestBody Site body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(siteService.create(body, companyId));
    }

    @PutMapping("/{id}")
    public Site update(@PathVariable Integer id, @RequestBody Site body) {
        return siteService.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        siteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.service.CompanyService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public List<Company> all() {
        return companyService.findAll();
    }

    @GetMapping("/{id}")
    public Company one(@PathVariable Integer id) {
        return companyService.findById(id);
    }

    @GetMapping("/by-user/{userId}")
    public List<Company> byUser(@PathVariable Integer userId) {
        return companyService.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Company> create(@RequestParam Integer userId, @RequestBody Company body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(companyService.create(body, userId));
    }

    @PutMapping("/{id}")
    public Company update(@PathVariable Integer id, @RequestBody Company body) {
        return companyService.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

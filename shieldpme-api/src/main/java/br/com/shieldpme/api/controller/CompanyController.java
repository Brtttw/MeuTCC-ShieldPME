package br.com.shieldpme.api.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import br.com.shieldpme.api.dto.CompanyRequest;
import br.com.shieldpme.api.dto.CompanyResponse;
import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.service.CompanyService;
import br.com.shieldpme.api.util.DtoMapper;

@RestController
@RequestMapping("/api/companies")
@Validated
public class CompanyController {
    private final CompanyService companyService;
    public CompanyController(CompanyService companyService) { this.companyService = companyService; }

    @GetMapping public List<CompanyResponse> all() { return companyService.findAll().stream().map(DtoMapper::toResponse).toList(); }
    @GetMapping("/{id}") public CompanyResponse one(@PathVariable Integer id) { return DtoMapper.toResponse(companyService.findById(id)); }
    @GetMapping("/by-user/{userId}") public List<CompanyResponse> byUser(@PathVariable Integer userId) {
        return companyService.findByUserId(userId).stream().map(DtoMapper::toResponse).toList();
    }
    @PostMapping public ResponseEntity<CompanyResponse> create(@Valid @RequestBody CompanyRequest request) {
        Company company = new Company(); company.setName(request.name()); company.setCnpj(request.cnpj());
        Company saved = companyService.create(company, request.userId());
        return ResponseEntity.status(HttpStatus.CREATED).body(DtoMapper.toResponse(saved));
    }
    @PutMapping("/{id}") public CompanyResponse update(@PathVariable Integer id, @Valid @RequestBody CompanyRequest request) {
        Company company = new Company(); company.setName(request.name()); company.setCnpj(request.cnpj());
        return DtoMapper.toResponse(companyService.update(id, company));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Integer id) {
        companyService.delete(id); return ResponseEntity.noContent().build();
    }
}

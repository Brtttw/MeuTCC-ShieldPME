package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.Contract;
import br.com.shieldpme.api.service.ContractManagementService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {
    private final ContractManagementService service;

    public ContractController(ContractManagementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Contract> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Contract one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Contract> create(@RequestBody Contract body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public Contract update(@PathVariable Integer id, @RequestBody Contract body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

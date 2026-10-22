package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ContractService;
import br.com.shieldpme.api.service.ContractServiceService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contract-services")
public class ContractServiceController {
    private final ContractServiceService service;

    public ContractServiceController(ContractServiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<ContractService> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ContractService one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ContractService> create(@RequestBody ContractService body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ContractService update(@PathVariable Integer id, @RequestBody ContractService body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

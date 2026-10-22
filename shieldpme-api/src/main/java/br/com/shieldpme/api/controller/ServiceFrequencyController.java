package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ServiceFrequency;
import br.com.shieldpme.api.service.ContractServiceFrequencyService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-frequencies")
public class ServiceFrequencyController {
    private final ContractServiceFrequencyService service;

    public ServiceFrequencyController(ContractServiceFrequencyService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceFrequency> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ServiceFrequency one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ServiceFrequency> create(@RequestBody ServiceFrequency body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ServiceFrequency update(@PathVariable Integer id, @RequestBody ServiceFrequency body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

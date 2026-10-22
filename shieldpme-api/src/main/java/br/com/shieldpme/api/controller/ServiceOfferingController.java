package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ServiceOffering;
import br.com.shieldpme.api.service.ContractServiceOfferingService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-offerings")
public class ServiceOfferingController {
    private final ContractServiceOfferingService service;

    public ServiceOfferingController(ContractServiceOfferingService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceOffering> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ServiceOffering one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ServiceOffering> create(@RequestBody ServiceOffering body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ServiceOffering update(@PathVariable Integer id, @RequestBody ServiceOffering body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

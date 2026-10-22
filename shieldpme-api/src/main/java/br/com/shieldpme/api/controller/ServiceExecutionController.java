package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ServiceExecution;
import br.com.shieldpme.api.service.ServiceExecutionService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-executions")
public class ServiceExecutionController {
    private final ServiceExecutionService service;

    public ServiceExecutionController(ServiceExecutionService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceExecution> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ServiceExecution one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ServiceExecution> create(@RequestBody ServiceExecution body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ServiceExecution update(@PathVariable Integer id, @RequestBody ServiceExecution body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

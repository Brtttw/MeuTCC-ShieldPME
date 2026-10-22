package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ExecutionAssignment;
import br.com.shieldpme.api.service.ExecutionAssignmentService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execution-assignments")
public class ExecutionAssignmentController {
    private final ExecutionAssignmentService service;

    public ExecutionAssignmentController(ExecutionAssignmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<ExecutionAssignment> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ExecutionAssignment one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ExecutionAssignment> create(@RequestBody ExecutionAssignment body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ExecutionAssignment update(
            @PathVariable Integer id, @RequestBody ExecutionAssignment body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

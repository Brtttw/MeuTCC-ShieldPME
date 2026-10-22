package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.ReportSection;
import br.com.shieldpme.api.service.ReportSectionService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report-sections")
public class ReportSectionController {
    private final ReportSectionService service;

    public ReportSectionController(ReportSectionService service) {
        this.service = service;
    }

    @GetMapping
    public List<ReportSection> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ReportSection one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ReportSection> create(@RequestBody ReportSection body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public ReportSection update(@PathVariable Integer id, @RequestBody ReportSection body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

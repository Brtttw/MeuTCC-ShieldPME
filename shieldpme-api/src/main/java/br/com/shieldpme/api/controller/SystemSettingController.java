package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.SystemSetting;
import br.com.shieldpme.api.service.SystemSettingService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system-settings")
public class SystemSettingController {
    private final SystemSettingService service;

    public SystemSettingController(SystemSettingService service) {
        this.service = service;
    }

    @GetMapping
    public List<SystemSetting> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public SystemSetting one(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<SystemSetting> create(@RequestBody SystemSetting body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(body));
    }

    @PutMapping("/{id}")
    public SystemSetting update(@PathVariable Integer id, @RequestBody SystemSetting body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

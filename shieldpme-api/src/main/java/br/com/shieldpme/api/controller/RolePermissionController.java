package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.RolePermission;
import br.com.shieldpme.api.service.RolePermissionService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role-permissions")
public class RolePermissionController {
    private final RolePermissionService service;

    public RolePermissionController(RolePermissionService service) {
        this.service = service;
    }

    @GetMapping
    public List<RolePermission> all() {
        return service.findAll();
    }
}

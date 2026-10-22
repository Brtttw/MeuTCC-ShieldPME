package br.com.shieldpme.api.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import br.com.shieldpme.api.dto.UserRequest;
import br.com.shieldpme.api.dto.UserUpdateRequest;
import br.com.shieldpme.api.dto.UserResponse;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.service.UserService;
import br.com.shieldpme.api.util.DtoMapper;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @GetMapping
    public List<UserResponse> all() { return userService.findAll().stream().map(DtoMapper::toResponse).toList(); }

    @GetMapping("/{id}")
    public UserResponse one(@PathVariable Integer id) { return DtoMapper.toResponse(userService.findById(id)); }

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest request) {
        User user = new User();
        user.setEmail(request.email()); user.setPasswordHash(request.password()); user.setPhone(request.phone());
        User saved = userService.create(user, request.roleId());
        return ResponseEntity.status(HttpStatus.CREATED).body(DtoMapper.toResponse(saved));
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Integer id, @Valid @RequestBody UserUpdateRequest request) {
        User user = new User(); user.setEmail(request.email()); user.setPhone(request.phone());
        user.setPasswordHash(request.password());
        return DtoMapper.toResponse(userService.update(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userService.delete(id); return ResponseEntity.noContent().build();
    }
}

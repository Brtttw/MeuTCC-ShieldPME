package br.com.shieldpme.api.controller;

import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.service.UserService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> all() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User one(@PathVariable Integer id) {
        return userService.findById(id);
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestParam Integer roleId, @RequestBody User body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(body, roleId));
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User body) {
        return userService.update(id, body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

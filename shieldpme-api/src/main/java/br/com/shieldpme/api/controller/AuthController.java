package br.com.shieldpme.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import br.com.shieldpme.api.dto.AuthDtos.LoginResponse;
import br.com.shieldpme.api.dto.AuthDtos.MessageResponse;
import br.com.shieldpme.api.dto.AuthDtos.RegisterClientRequest;
import br.com.shieldpme.api.dto.AuthDtos.SessionUser;
import br.com.shieldpme.api.dto.LoginRequest;
import br.com.shieldpme.api.security.AuthUser;
import br.com.shieldpme.api.service.AuthenticationService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService auth;

    public AuthController(AuthenticationService auth) { this.auth = auth; }

    /** Cadastro PUBLICO: so cria clientes. Nao existe endpoint publico para funcionarios. */
    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody RegisterClientRequest request) {
        auth.registerClient(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Conta criada com sucesso."));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) { return auth.login(request); }

    @GetMapping("/me")
    public SessionUser me(@AuthenticationPrincipal AuthUser user) { return auth.me(user.id()); }
}

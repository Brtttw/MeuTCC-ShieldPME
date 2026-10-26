package br.com.shieldpme.api.security;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/** Emite e valida tokens JWT assinados com HS256. O segredo vem de variavel de ambiente. */
@Service
public class JwtService {

    private final SecretKey key;
    private final Duration lifetime;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.expiration-minutes}") long expirationMinutes) {
        byte[] bytes = secret == null ? new byte[0] : secret.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException(
                    "JWT_SECRET deve ter pelo menos 32 caracteres (gere com: openssl rand -base64 48).");
        }
        this.key = Keys.hmacShaKeyFor(bytes);
        this.lifetime = Duration.ofMinutes(expirationMinutes);
    }

    public long lifetimeSeconds() {
        return lifetime.toSeconds();
    }

    public String generate(Integer userId, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("role", role)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(lifetime)))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    /** Devolve o id do usuario se o token for valido (assinatura e validade); caso contrario, vazio. */
    public Optional<Integer> validateAndGetUserId(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
            return Optional.of(Integer.valueOf(claims.getSubject()));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}

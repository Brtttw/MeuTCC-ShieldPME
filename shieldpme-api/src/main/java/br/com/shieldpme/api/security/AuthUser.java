package br.com.shieldpme.api.security;

/** Usuario autenticado da requisicao atual (principal do Spring Security). Nunca carrega a senha. */
public record AuthUser(Integer id, String email, String role) {}

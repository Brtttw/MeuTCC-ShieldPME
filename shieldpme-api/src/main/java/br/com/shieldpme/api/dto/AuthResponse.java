package br.com.shieldpme.api.dto;

public record AuthResponse(Integer userId, String email, String role, String message) {}

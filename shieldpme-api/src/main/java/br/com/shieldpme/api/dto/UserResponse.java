package br.com.shieldpme.api.dto;

import java.time.LocalDateTime;

public record UserResponse(Integer id, String email, String phone, Integer roleId, String roleName,
                           LocalDateTime createdAt, LocalDateTime updatedAt) {}

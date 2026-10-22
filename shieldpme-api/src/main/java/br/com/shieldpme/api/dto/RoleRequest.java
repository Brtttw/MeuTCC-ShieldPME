package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RoleRequest(@NotBlank @Size(max=35) String name, @Size(max=255) String description) {}

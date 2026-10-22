package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PermissionRequest(@NotBlank @Size(max=50) String name, @Size(max=255) String description) {}

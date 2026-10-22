package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeRequest(@NotBlank @Size(max=150) String name, @NotBlank @Email @Size(max=100) String email,
 @Size(max=20) String phone, Boolean active) {}

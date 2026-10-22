package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(
 @Email @Size(max=100) String email,
 @Size(min=8,max=72) String password,
 @Size(max=20) String phone
) {}

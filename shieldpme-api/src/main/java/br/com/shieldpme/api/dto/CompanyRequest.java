package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CompanyRequest(@NotBlank @Size(max=150) String name,

 @NotBlank @Pattern(regexp="\\d{14}", message="O CNPJ deve conter exatamente 14 dígitos") String cnpj,
 Integer userId) {}

package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ServiceFrequencyRequest(@NotBlank @Size(max=20) String name, @NotNull @Positive Short intervalValue,
 @NotBlank @Size(max=10) String intervalUnit) {}

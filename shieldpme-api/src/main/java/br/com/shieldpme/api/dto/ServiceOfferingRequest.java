package br.com.shieldpme.api.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ServiceOfferingRequest(@NotBlank @Size(max=50) String name, @NotNull @PositiveOrZero BigDecimal basePrice,
 @NotBlank String description, Boolean active) {}

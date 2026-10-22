package br.com.shieldpme.api.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ServiceExecutionRequest(@NotNull @Positive Short executionNumber,
 @NotNull LocalDate dueDate, @NotNull LocalDate releaseDate,
 @Size(max=20) String status, String notes, @NotNull Integer contractServiceId) {}

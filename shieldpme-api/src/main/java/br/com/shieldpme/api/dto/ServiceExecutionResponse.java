package br.com.shieldpme.api.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ServiceExecutionResponse(Integer id, Short executionNumber, LocalDate dueDate,
 LocalDate releaseDate, LocalDateTime startedAt, LocalDateTime completedAt, String status,
 String notes, Integer contractServiceId, LocalDateTime createdAt, LocalDateTime updatedAt) {}

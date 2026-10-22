package br.com.shieldpme.api.dto;

import java.time.LocalDateTime;

public record CompanyResponse(Integer id, String name, String cnpj, Integer userId,
 LocalDateTime createdAt, LocalDateTime updatedAt) {}

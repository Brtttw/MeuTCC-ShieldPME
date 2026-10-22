package br.com.shieldpme.api.dto;

import java.time.LocalDateTime;

public record SiteResponse(Integer id, String name, String url, String backendStack,
 String databaseStack, String repositoryUrl, Integer companyId,
 LocalDateTime createdAt, LocalDateTime updatedAt) {}

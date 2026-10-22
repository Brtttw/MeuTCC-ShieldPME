package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SiteRequest(@Size(max=100) String name, @NotBlank @Size(max=255) String url,
 @Size(max=255) String backendStack, @Size(max=255) String databaseStack,
 @Size(max=255) String repositoryUrl, Integer companyId) {}

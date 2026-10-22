package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReportRequest(@NotBlank @Size(max=200) String title, @Size(max=255) String fileName,
 @Size(max=500) String filePath, @NotBlank @Size(max=20) String status,
 Integer serviceExecutionId, Integer responsibleEmployeeId) {}

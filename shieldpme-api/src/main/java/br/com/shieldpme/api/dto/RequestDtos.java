package br.com.shieldpme.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** DTOs do fluxo de solicitacoes (cliente e funcionario). Nada aqui expoe hash de senha ou caminhos de arquivo. */
public final class RequestDtos {
    private RequestDtos() {}

    // ---------- entrada ----------
    public record ServiceItemRequest(
            @NotNull(message = "Informe o serviço.") Integer serviceId,
            @NotNull(message = "Informe a frequência.") Integer frequencyId,
            @NotNull @Min(value = 1, message = "A duração mínima é 1.") @Max(value = 12, message = "A duração máxima é 12.") Integer durationIntervals) {}

    public record CreateServiceRequest(
            @NotBlank(message = "Informe o site a ser analisado.") @Size(max = 255) String siteUrl,
            @Size(max = 100) String siteName,
            @Size(max = 255) String backendStack,
            @Size(max = 255) String databaseStack,
            @Size(max = 255) String repositoryUrl,
            @Size(max = 2000, message = "As informações adicionais excedem 2000 caracteres.") String notes,
            @NotEmpty(message = "Selecione ao menos um serviço.") @Size(max = 10) List<@Valid ServiceItemRequest> services) {}

    // ---------- saida ----------
    public record SiteInfo(String name, String url, String backendStack, String databaseStack, String repositoryUrl) {}

    public record CompanyInfo(String name, String cnpj) {}

    public record ClientInfo(String email, String phone) {}

    public record ReportInfo(Integer id, String title, String fileName, LocalDateTime releasedAt) {}

    public record ExecutionView(Integer id, Short number, LocalDate dueDate, String status,
                                List<String> assignedTo, boolean assignedToMe, ReportInfo report) {}

    public record ServiceItemView(Integer contractServiceId, String serviceName, String frequencyName,
                                  Short durationIntervals, BigDecimal totalPrice, List<ExecutionView> executions) {}

    public record RequestSummary(Integer id, String status, LocalDateTime createdAt, String companyName,
                                 String siteUrl, List<String> serviceNames) {}

    public record RequestDetail(Integer id, String status, LocalDateTime createdAt, String notes, SiteInfo site,
                                CompanyInfo company, ClientInfo client, List<ServiceItemView> services) {}

    public record ClientReportView(Integer reportId, String title, String fileName, LocalDateTime releasedAt,
                                   Integer requestId, String serviceName, Short executionNumber, String siteUrl) {}

    // ---------- catalogo ----------
    public record CatalogService(Integer id, String name, String description, BigDecimal basePrice, boolean available) {}

    public record CatalogFrequency(Integer id, String name) {}

    public record Catalog(List<CatalogService> services, List<CatalogFrequency> frequencies) {}

    // ---------- notificacoes ----------
    public record NotificationView(Integer id, String type, String message, Integer contractId, boolean read,
                                   LocalDateTime createdAt) {}

    public record NotificationList(long unread, List<NotificationView> items) {}
}

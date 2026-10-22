package br.com.shieldpme.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ContractRequest(@NotNull @Size(max=20) String status, LocalDate startDate, LocalDate endDate,

 @NotNull @PositiveOrZero BigDecimal totalAmount, @NotNull @Size(max=20) String paymentStatus,
 LocalDate paidAtDate, Integer companyId) {}

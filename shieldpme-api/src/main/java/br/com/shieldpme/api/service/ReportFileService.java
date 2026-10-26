package br.com.shieldpme.api.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.shieldpme.api.dto.RequestDtos.ClientReportView;
import br.com.shieldpme.api.dto.RequestDtos.ReportInfo;
import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.entity.ExecutionAssignment;
import br.com.shieldpme.api.entity.Report;
import br.com.shieldpme.api.entity.ServiceExecution;
import br.com.shieldpme.api.exception.AccessForbiddenException;
import br.com.shieldpme.api.exception.BusinessRuleException;
import br.com.shieldpme.api.exception.ResourceNotFoundException;
import br.com.shieldpme.api.repository.ExecutionAssaignmentRepository;
import br.com.shieldpme.api.repository.ReportRepository;
import br.com.shieldpme.api.repository.ServiceExecutionRepository;
import br.com.shieldpme.api.security.AuthUser;

/** Recebe, armazena e disponibiliza os PDFs enviados pelos funcionarios. Nao gera nem converte relatorios. */
@Service
public class ReportFileService {

    /** Conteudo + nome de exibicao de um relatorio, ja autorizado para quem pediu. */
    public record ReportFile(byte[] content, String fileName) {}

    private final ReportRepository reports;
    private final ServiceExecutionRepository executions;
    private final ExecutionAssaignmentRepository assignments;
    private final ReportStorageService storage;
    private final StaffAccessService access;

    public ReportFileService(ReportRepository reports, ServiceExecutionRepository executions,
                             ExecutionAssaignmentRepository assignments, ReportStorageService storage,
                             StaffAccessService access) {
        this.reports = reports;
        this.executions = executions;
        this.assignments = assignments;
        this.storage = storage;
        this.access = access;
    }

    // ------------------------------------------------------------------ funcionario: upload

    @Transactional
    public ReportInfo upload(AuthUser user, Integer executionId, String title, MultipartFile file) {
        Employee employee = access.requireActiveEmployee(user);
        ServiceExecution execution = executions.findById(executionId)
                .orElseThrow(() -> new ResourceNotFoundException("Execução não encontrada."));
        if (!assignments.existsByServiceExecutionIdAndEmployeeId(executionId, employee.getId()))
            throw new AccessForbiddenException("Assuma o atendimento desta execução antes de enviar o relatório.");
        if ("CANCELLED".equals(execution.getStatus()))
            throw new BusinessRuleException("Esta execução foi cancelada.");
        if (file == null || file.isEmpty()) throw new BusinessRuleException("Selecione um arquivo PDF.");

        byte[] data;
        try {
            data = file.getBytes();
        } catch (IOException e) {
            throw new BusinessRuleException("Não foi possível ler o arquivo enviado.");
        }
        storage.validate(data);
        String storedName = storage.store(data);

        Report report = reports.findByServiceExecutionId(executionId).orElseGet(Report::new);
        String previous = report.getFilePath();
        LocalDateTime now = LocalDateTime.now();
        report.setServiceExecution(execution);
        report.setResponsibleEmployee(employee);
        report.setTitle(resolveTitle(title, execution));
        report.setFileName(displayName(file.getOriginalFilename()));
        report.setFilePath(storedName);
        report.setStatus("RELEASED");
        report.setGeneratedAt(now);
        report.setReleasedAt(now);
        try {
            report = reports.saveAndFlush(report);
        } catch (RuntimeException e) {
            storage.deleteQuietly(storedName);
            throw e;
        }
        if (previous != null) storage.deleteQuietly(previous);

        execution.setStatus("COMPLETED");
        if (execution.getStartedAt() == null) execution.setStartedAt(now);
        execution.setCompletedAt(now);
        for (ExecutionAssignment a : assignments.findByServiceExecutionId(executionId)) {
            if (a.getEmployee().getId().equals(employee.getId()) && a.getCompletedAt() == null) a.setCompletedAt(now);
        }
        refreshContractStatus(execution);
        return new ReportInfo(report.getId(), report.getTitle(), report.getFileName(), report.getReleasedAt());
    }

    private void refreshContractStatus(ServiceExecution execution) {
        var contract = execution.getContractService().getContract();
        var all = executions.findByContractServiceContractIdOrderByContractServiceIdAscExecutionNumberAsc(contract.getId());
        boolean allDone = all.stream().allMatch(e -> "COMPLETED".equals(e.getStatus()) || "CANCELLED".equals(e.getStatus()));
        contract.setStatus(allDone ? "COMPLETED" : "ACTIVE");
    }

    // ------------------------------------------------------------------ download

    /** Cliente: so relatorios LIBERADOS de contratos da propria empresa; senao 404. */
    @Transactional(readOnly = true)
    public ReportFile downloadForClient(AuthUser user, Integer reportId) {
        Report report = reports.findById(reportId).orElseThrow(this::notFound);
        Integer ownerId = report.getServiceExecution().getContractService().getContract().getCompany().getUser().getId();
        if (!ownerId.equals(user.id()) || !"RELEASED".equals(report.getStatus()) || report.getFilePath() == null)
            throw notFound();
        return new ReportFile(storage.load(report.getFilePath()), report.getFileName());
    }

    /** Funcionario: somente relatorios de execucoes que ele atende. */
    @Transactional(readOnly = true)
    public ReportFile downloadForStaff(AuthUser user, Integer reportId) {
        Employee employee = access.requireActiveEmployee(user);
        Report report = reports.findById(reportId).orElseThrow(this::notFound);
        Integer executionId = report.getServiceExecution().getId();
        if (report.getFilePath() == null) throw notFound();
        if (!assignments.existsByServiceExecutionIdAndEmployeeId(executionId, employee.getId()))
            throw new AccessForbiddenException("Você não atende esta execução.");
        return new ReportFile(storage.load(report.getFilePath()), report.getFileName());
    }

    @Transactional(readOnly = true)
    public List<ClientReportView> listForClient(AuthUser user) {
        return reports.findReleasedForUser(user.id()).stream().map(r -> {
            var ex = r.getServiceExecution();
            var cs = ex.getContractService();
            return new ClientReportView(r.getId(), r.getTitle(), r.getFileName(), r.getReleasedAt(),
                    cs.getContract().getId(), cs.getService().getName(), ex.getExecutionNumber(), cs.getSite().getUrl());
        }).toList();
    }

    // ------------------------------------------------------------------ utilitarios

    private ResourceNotFoundException notFound() { return new ResourceNotFoundException("Relatório não encontrado."); }

    private static String resolveTitle(String title, ServiceExecution ex) {
        if (title != null && !title.isBlank()) return title.trim().substring(0, Math.min(title.trim().length(), 200));
        return ("Relatório - " + ex.getContractService().getService().getName() + " #" + ex.getExecutionNumber());
    }

    /** Nome apenas para exibicao: sem caminho, sem caracteres de controle, sempre terminando em .pdf. */
    static String displayName(String original) {
        String name = original == null ? "relatorio.pdf" : original;
        name = name.substring(Math.max(name.lastIndexOf('/'), name.lastIndexOf('\\')) + 1);
        name = name.replaceAll("[^\\p{L}\\p{N} ._()\\-]", "_").trim();
        if (name.isEmpty()) name = "relatorio";
        if (name.length() > 120) name = name.substring(0, 120);
        return name.toLowerCase().endsWith(".pdf") ? name : name + ".pdf";
    }
}

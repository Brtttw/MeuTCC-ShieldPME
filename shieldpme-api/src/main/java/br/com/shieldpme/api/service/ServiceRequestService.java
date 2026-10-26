package br.com.shieldpme.api.service;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.shieldpme.api.dto.RequestDtos.*;
import br.com.shieldpme.api.entity.*;
import br.com.shieldpme.api.exception.BusinessRuleException;
import br.com.shieldpme.api.exception.ResourceConflictException;
import br.com.shieldpme.api.exception.ResourceNotFoundException;
import br.com.shieldpme.api.repository.*;
import br.com.shieldpme.api.security.AuthUser;

/**
 * Fluxo de solicitacoes reaproveitando o modelo existente:
 * solicitacao = Contract (PENDING) + ContractService (servico/site/frequencia) + ServiceExecution (uma por intervalo).
 * Relatorio PDF = Report (1 por execucao).
 */
@Service
public class ServiceRequestService {

    @PersistenceContext
    private EntityManager em;

    private final ContractRepository contracts;
    private final ContractServiceRepository contractServices;
    private final ServiceExecutionRepository executions;
    private final ReportRepository reports;
    private final ExecutionAssaignmentRepository assignments;
    private final CompanyRepository companies;
    private final SiteRepository sites;
    private final ServiceOfferingRepository offerings;
    private final ServiceFrequencyRepository frequencies;
    private final NotificationService notifications;
    private final StaffAccessService access;

    public ServiceRequestService(ContractRepository contracts, ContractServiceRepository contractServices,
                                 ServiceExecutionRepository executions, ReportRepository reports,
                                 ExecutionAssaignmentRepository assignments, CompanyRepository companies,
                                 SiteRepository sites, ServiceOfferingRepository offerings,
                                 ServiceFrequencyRepository frequencies, NotificationService notifications,
                                 StaffAccessService access) {
        this.contracts = contracts;
        this.contractServices = contractServices;
        this.executions = executions;
        this.reports = reports;
        this.assignments = assignments;
        this.companies = companies;
        this.sites = sites;
        this.offerings = offerings;
        this.frequencies = frequencies;
        this.notifications = notifications;
        this.access = access;
    }

    // ------------------------------------------------------------------ catalogo

    @Transactional(readOnly = true)
    public Catalog catalog() {
        List<CatalogService> services = offerings.findAll().stream()
                .filter(ServiceOffering::isActive)
                .map(o -> new CatalogService(o.getId(), o.getName(), o.getDescription(), o.getBasePrice()))
                .toList();
        List<CatalogFrequency> freqs = frequencies.findAll().stream()
                .map(f -> new CatalogFrequency(f.getId(), f.getName())).toList();
        return new Catalog(services, freqs);
    }

    // ------------------------------------------------------------------ cliente

    @Transactional
    public RequestDetail create(AuthUser user, CreateServiceRequest req) {
        Company company = companies.findByUserId(user.id()).stream().findFirst()
                .orElseThrow(() -> new BusinessRuleException("Nenhuma empresa associada a esta conta."));

        Set<Integer> seen = new HashSet<>();
        for (ServiceItemRequest item : req.services()) {
            if (!seen.add(item.serviceId())) throw new BusinessRuleException("Serviço repetido na solicitação.");
        }

        Site site = resolveSite(company, req);

        Contract contract = new Contract();
        contract.setCompany(company);
        contract.setStatus("PENDING");
        contract.setPaymentStatus("PENDING");
        contract.setTotalAmount(BigDecimal.ZERO);
        LocalDate start = LocalDate.now();
        contract.setStartDate(start);
        contract = contracts.save(contract);

        String notes = req.notes() == null || req.notes().isBlank() ? null : req.notes().trim();
        BigDecimal total = BigDecimal.ZERO;
        LocalDate contractEnd = start;

        for (ServiceItemRequest item : req.services()) {
            ServiceOffering offering = offerings.findById(item.serviceId()).filter(ServiceOffering::isActive)
                    .orElseThrow(() -> new BusinessRuleException("Serviço indisponível: " + item.serviceId()));
            ServiceFrequency frequency = frequencies.findById(item.frequencyId())
                    .orElseThrow(() -> new BusinessRuleException("Frequência inválida: " + item.frequencyId()));
            int n = item.durationIntervals();

            // O preco vem SEMPRE do catalogo (nunca do cliente).
            BigDecimal unit = offering.getBasePrice();
            BigDecimal itemTotal = unit.multiply(BigDecimal.valueOf(n));
            LocalDate lastDue = addIntervals(start, frequency, n - 1);

            ContractService cs = new ContractService();
            cs.setContract(contract);
            cs.setService(offering);
            cs.setSite(site);
            cs.setFrequency(frequency);
            cs.setDurationIntervals((short) n);
            cs.setUnitPrice(unit);
            cs.setDiscountPercent(BigDecimal.ZERO);
            cs.setTotalPrice(itemTotal);
            cs.setStartDate(start);
            cs.setEndDate(lastDue);
            cs = contractServices.save(cs);

            for (int i = 0; i < n; i++) {
                LocalDate due = addIntervals(start, frequency, i);
                ServiceExecution ex = new ServiceExecution();
                ex.setContractService(cs);
                ex.setExecutionNumber((short) (i + 1));
                ex.setDueDate(due);
                ex.setReleaseDate(due);
                ex.setStatus("PENDING");
                ex.setNotes(notes);
                executions.save(ex);
            }
            total = total.add(itemTotal);
            if (lastDue.isAfter(contractEnd)) contractEnd = lastDue;
        }

        contract.setTotalAmount(total);
        contract.setEndDate(contractEnd);
        contracts.saveAndFlush(contract);
        em.refresh(contract); // carrega created_at (preenchido pelo default do banco)

        notifications.notifyNewRequest(contract);
        return buildDetail(contract, false, null);
    }

    @Transactional(readOnly = true)
    public List<RequestSummary> listForClient(AuthUser user) {
        return contracts.findByCompanyUserIdOrderByCreatedAtDesc(user.id()).stream()
                .map(c -> summary(c, false)).toList();
    }

    @Transactional(readOnly = true)
    public RequestDetail detailForClient(AuthUser user, Integer contractId) {
        Contract contract = contracts.findById(contractId).orElseThrow(this::notFound);
        // Isolamento: contrato de outra empresa/cliente responde 404 (nao revela que existe).
        if (!contract.getCompany().getUser().getId().equals(user.id())) throw notFound();
        return buildDetail(contract, false, null);
    }

    // ------------------------------------------------------------------ funcionario

    @Transactional(readOnly = true)
    public List<RequestSummary> listForStaff(AuthUser user) {
        access.requireActiveEmployee(user);
        return contracts.findTop50ByOrderByCreatedAtDesc().stream().map(c -> summary(c, true)).toList();
    }

    @Transactional
    public RequestDetail detailForStaff(AuthUser user, Integer contractId) {
        Employee employee = access.requireActiveEmployee(user);
        Contract contract = contracts.findById(contractId).orElseThrow(this::notFound);
        notifications.markContractRead(user.id(), contractId);
        return buildDetail(contract, true, employee.getId());
    }

    /** O funcionario assume o atendimento de uma execucao (vinculo em ExecutionAssignment). */
    @Transactional
    public void claim(AuthUser user, Integer executionId) {
        Employee employee = access.requireActiveEmployee(user);
        ServiceExecution ex = executions.findById(executionId).orElseThrow(this::notFound);
        if ("COMPLETED".equals(ex.getStatus()) || "CANCELLED".equals(ex.getStatus()))
            throw new BusinessRuleException("Esta execução não está mais disponível para atendimento.");
        if (assignments.existsByServiceExecutionIdAndEmployeeId(executionId, employee.getId()))
            throw new ResourceConflictException("Você já está atendendo esta execução.");

        boolean first = assignments.findByServiceExecutionId(executionId).isEmpty();
        ExecutionAssignment a = new ExecutionAssignment();
        a.setServiceExecution(ex);
        a.setEmployee(employee);
        a.setAssignedAt(LocalDateTime.now());
        a.setLead(first);
        assignments.save(a);

        if ("PENDING".equals(ex.getStatus())) {
            ex.setStatus("RUNNING");
            ex.setStartedAt(LocalDateTime.now());
        }
        Contract contract = ex.getContractService().getContract();
        if ("PENDING".equals(contract.getStatus())) contract.setStatus("ACTIVE");
    }

    // ------------------------------------------------------------------ montagem das respostas

    private ResourceNotFoundException notFound() {
        return new ResourceNotFoundException("Solicitação não encontrada.");
    }

    private RequestSummary summary(Contract c, boolean staff) {
        List<ContractService> list = contractServices.findByContractId(c.getId());
        String siteUrl = list.isEmpty() ? null : list.get(0).getSite().getUrl();
        return new RequestSummary(c.getId(), c.getStatus(), c.getCreatedAt(),
                staff ? c.getCompany().getName() : null, siteUrl,
                list.stream().map(cs -> cs.getService().getName()).toList());
    }

    /** staff=true inclui empresa, cliente e atendentes; staff=false so mostra relatorios LIBERADOS. */
    private RequestDetail buildDetail(Contract c, boolean staff, Integer employeeId) {
        List<ContractService> list = contractServices.findByContractId(c.getId());
        List<ServiceExecution> exs = executions
                .findByContractServiceContractIdOrderByContractServiceIdAscExecutionNumberAsc(c.getId());
        Map<Integer, Report> reportByExecution = reports.findByServiceExecutionContractServiceContractId(c.getId())
                .stream().filter(r -> r.getFilePath() != null && (staff || "RELEASED".equals(r.getStatus())))
                .collect(Collectors.toMap(r -> r.getServiceExecution().getId(), Function.identity(), (a, b) -> a));

        List<ServiceItemView> services = new ArrayList<>();
        for (ContractService cs : list) {
            List<ExecutionView> views = new ArrayList<>();
            for (ServiceExecution ex : exs) {
                if (!ex.getContractService().getId().equals(cs.getId())) continue;
                List<String> assigned = new ArrayList<>();
                boolean mine = false;
                if (staff) {
                    for (ExecutionAssignment a : assignments.findByServiceExecutionId(ex.getId())) {
                        assigned.add(a.getEmployee().getName());
                        if (a.getEmployee().getId().equals(employeeId)) mine = true;
                    }
                }
                Report r = reportByExecution.get(ex.getId());
                ReportInfo info = r == null ? null
                        : new ReportInfo(r.getId(), r.getTitle(), r.getFileName(), r.getReleasedAt());
                views.add(new ExecutionView(ex.getId(), ex.getExecutionNumber(), ex.getDueDate(), ex.getStatus(),
                        assigned, mine, info));
            }
            services.add(new ServiceItemView(cs.getId(), cs.getService().getName(), cs.getFrequency().getName(),
                    cs.getDurationIntervals(), cs.getTotalPrice(), views));
        }

        SiteInfo site = null;
        if (!list.isEmpty()) {
            Site s = list.get(0).getSite();
            site = new SiteInfo(s.getName(), s.getUrl(), s.getBackendStack(), s.getDatabaseStack(), s.getRepositoryUrl());
        }
        String notes = exs.isEmpty() ? null : exs.get(0).getNotes();
        CompanyInfo company = staff ? new CompanyInfo(c.getCompany().getName(), c.getCompany().getCnpj()) : null;
        ClientInfo client = staff
                ? new ClientInfo(c.getCompany().getUser().getEmail(), c.getCompany().getUser().getPhone()) : null;
        return new RequestDetail(c.getId(), c.getStatus(), c.getCreatedAt(), notes, site, company, client, services);
    }

    // ------------------------------------------------------------------ utilitarios

    private Site resolveSite(Company company, CreateServiceRequest req) {
        String url = normalizeUrl(req.siteUrl());
        Site site = sites.findByUrl(url).orElse(null);
        if (site == null) {
            site = new Site();
            site.setCompany(company);
            site.setUrl(url);
        } else if (!site.getCompany().getId().equals(company.getId())) {
            // Mensagem generica: nao revela que a URL pertence a outra empresa.
            throw new ResourceConflictException("Esta URL não pode ser utilizada nesta conta.");
        }
        if (notBlank(req.siteName())) site.setName(req.siteName().trim());
        if (notBlank(req.backendStack())) site.setBackendStack(req.backendStack().trim());
        if (notBlank(req.databaseStack())) site.setDatabaseStack(req.databaseStack().trim());
        if (notBlank(req.repositoryUrl())) site.setRepositoryUrl(req.repositoryUrl().trim());
        return sites.save(site);
    }

    private static boolean notBlank(String s) { return s != null && !s.isBlank(); }

    /** Aceita apenas http/https com host; remove query, fragmento e barra final. */
    static String normalizeUrl(String raw) {
        try {
            URI uri = new URI(raw.trim());
            String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase(Locale.ROOT);
            if (!scheme.equals("http") && !scheme.equals("https")) throw new BusinessRuleException("A URL do site deve começar com http:// ou https://.");
            if (uri.getHost() == null || uri.getUserInfo() != null) throw new BusinessRuleException("URL do site inválida.");
            String path = uri.getPath() == null ? "" : uri.getPath().replaceAll("/+$", "");
            String url = scheme + "://" + uri.getHost().toLowerCase(Locale.ROOT)
                    + (uri.getPort() == -1 ? "" : ":" + uri.getPort()) + path;
            if (url.length() > 255) throw new BusinessRuleException("A URL do site é longa demais.");
            return url;
        } catch (URISyntaxException e) {
            throw new BusinessRuleException("URL do site inválida.");
        }
    }

    static LocalDate addIntervals(LocalDate start, ServiceFrequency f, int times) {
        long amount = (long) f.getIntervalValue() * times;
        return switch (f.getIntervalUnit()) {
            case "WEEK" -> start.plusWeeks(amount);
            case "MONTH" -> start.plusMonths(amount);
            default -> throw new IllegalStateException("Unidade de frequência desconhecida: " + f.getIntervalUnit());
        };
    }
}

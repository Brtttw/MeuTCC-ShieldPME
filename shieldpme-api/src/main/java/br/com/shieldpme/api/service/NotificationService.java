package br.com.shieldpme.api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.shieldpme.api.dto.RequestDtos.NotificationList;
import br.com.shieldpme.api.dto.RequestDtos.NotificationView;
import br.com.shieldpme.api.entity.Contract;
import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.entity.Notification;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.exception.ResourceNotFoundException;
import br.com.shieldpme.api.repository.EmployeeRepository;
import br.com.shieldpme.api.repository.NotificationRepository;
import br.com.shieldpme.api.repository.UserRepository;
import br.com.shieldpme.api.security.AuthUser;

/** Notificacoes internas (consultadas por polling). O texto nao inclui dados do cliente. */
@Service
public class NotificationService {
    public static final String NEW_REQUEST = "NEW_REQUEST";

    private final NotificationRepository notifications;
    private final EmployeeRepository employees;
    private final UserRepository users;
    private final StaffAccessService access;

    public NotificationService(NotificationRepository notifications, EmployeeRepository employees,
                               UserRepository users, StaffAccessService access) {
        this.notifications = notifications;
        this.employees = employees;
        this.users = users;
        this.access = access;
    }

    /** Cria uma notificacao para cada funcionario ativo que tenha usuario com papel EMPLOYEE. */
    @Transactional
    public void notifyNewRequest(Contract contract) {
        for (Employee employee : employees.findByActive(true)) {
            User recipient = users.findByEmail(employee.getEmail()).orElse(null);
            if (recipient == null || !AuthenticationService.ROLE_EMPLOYEE.equals(recipient.getRole().getName())) continue;
            Notification n = new Notification();
            n.setRecipient(recipient);
            n.setContract(contract);
            n.setType(NEW_REQUEST);
            n.setMessage("Nova solicitação de serviço #" + contract.getId());
            notifications.save(n);
        }
    }

    @Transactional(readOnly = true)
    public NotificationList list(AuthUser user) {
        access.requireActiveEmployee(user);
        List<NotificationView> items = notifications.findTop30ByRecipientIdOrderByCreatedAtDesc(user.id()).stream()
                .map(n -> new NotificationView(n.getId(), n.getType(), n.getMessage(),
                        n.getContract() == null ? null : n.getContract().getId(),
                        n.getReadAt() != null, n.getCreatedAt()))
                .toList();
        return new NotificationList(notifications.countByRecipientIdAndReadAtIsNull(user.id()), items);
    }

    @Transactional
    public void markRead(AuthUser user, Integer id) {
        access.requireActiveEmployee(user);
        Notification n = notifications.findByIdAndRecipientId(id, user.id())
                .orElseThrow(() -> new ResourceNotFoundException("Notificação não encontrada."));
        if (n.getReadAt() == null) n.setReadAt(LocalDateTime.now());
    }

    /** Ao abrir os detalhes de uma solicitacao, as notificacoes dela passam a lidas para quem abriu. */
    @Transactional
    public void markContractRead(Integer userId, Integer contractId) {
        notifications.findByRecipientIdAndContractIdAndReadAtIsNull(userId, contractId)
                .forEach(n -> n.setReadAt(LocalDateTime.now()));
    }
}

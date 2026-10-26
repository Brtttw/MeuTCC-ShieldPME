package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/** Notificacao interna para um usuario (hoje: aviso de nova solicitacao para funcionarios). */
@Getter
@Setter
@Entity
@Table(name = "notifications", schema = "dbo")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type", nullable = false, length = 30)
    private String type;

    @Column(name = "message", nullable = false, length = 200)
    private String message;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_user_id", nullable = false)
    private User recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id")
    private Contract contract;
}

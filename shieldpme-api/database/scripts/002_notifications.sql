USE ShieldPME;
GO

-- ============================================================
-- 17. NOTIFICATIONS
-- Notificacoes internas (ex.: nova solicitacao de servico) para usuarios da ShieldPME.
-- Nao contem dados sensiveis: apenas tipo, texto curto e a referencia ao contrato.
-- Execute uma unica vez, depois de shieldpme_database.sql.
-- ============================================================

CREATE TABLE dbo.notifications (
    id INT IDENTITY(1,1) NOT NULL,

    recipient_user_id INT NOT NULL,
    contract_id INT NULL,

    type NVARCHAR(30) NOT NULL,
    message NVARCHAR(200) NOT NULL,

    read_at DATETIME2(7) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_notifications_created_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_notifications
        PRIMARY KEY (id),

    CONSTRAINT fk_notifications_recipient
        FOREIGN KEY (recipient_user_id)
        REFERENCES dbo.users(id),

    CONSTRAINT fk_notifications_contract
        FOREIGN KEY (contract_id)
        REFERENCES dbo.contracts(id)
);
GO

CREATE INDEX ix_notifications_recipient_read
    ON dbo.notifications (recipient_user_id, read_at, created_at DESC);
GO

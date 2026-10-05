-- ShieldPME - estrutura do banco (SQL Server)
-- Execute este arquivo e depois seed.sql.

IF DB_ID('ShieldPME') IS NULL CREATE DATABASE ShieldPME;
GO
USE ShieldPME;
GO

-- ---------- Conteúdo exibido no site (somente leitura para o front) ----------

CREATE TABLE dbo.Plano (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Codigo      VARCHAR(20)   NOT NULL UNIQUE,          -- usado na URL: /checkout/{codigo}
    Nome        NVARCHAR(50)  NOT NULL,
    Descricao   NVARCHAR(500) NOT NULL,
    PrecoMensal DECIMAL(10,2) NOT NULL,
    PrecoAnual  DECIMAL(10,2) NOT NULL,                 -- "Anual à vista"
    Destaque    BIT           NOT NULL DEFAULT 0,       -- selo "Mais Popular"
    Ativo       BIT           NOT NULL DEFAULT 1,
    Ordem       INT           NOT NULL DEFAULT 0
);

CREATE TABLE dbo.PlanoBeneficio (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    PlanoId   INT           NOT NULL REFERENCES dbo.Plano(Id) ON DELETE CASCADE,
    Descricao NVARCHAR(150) NOT NULL,
    Ordem     INT           NOT NULL DEFAULT 0
);

CREATE TABLE dbo.Servico (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    Titulo           NVARCHAR(100) NOT NULL,
    Descricao        NVARCHAR(300) NOT NULL,
    IconeArquivo     VARCHAR(100)  NOT NULL,            -- arquivo em /imagens
    TextoAlternativo NVARCHAR(150) NOT NULL,
    Ativo            BIT           NOT NULL DEFAULT 1,
    Ordem            INT           NOT NULL DEFAULT 0
);

CREATE TABLE dbo.Postagem (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    Titulo           NVARCHAR(200) NOT NULL,
    Resumo           NVARCHAR(500) NOT NULL,
    PublicadoEm      DATE          NOT NULL,
    ImagemArquivo    VARCHAR(100)  NOT NULL,            -- arquivo em /imagens
    TextoAlternativo NVARCHAR(150) NOT NULL,
    Ativo            BIT           NOT NULL DEFAULT 1
);

CREATE TABLE dbo.Ferramenta (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Nome      NVARCHAR(100)  NOT NULL,
    Descricao NVARCHAR(1000) NOT NULL,
    Ativo     BIT            NOT NULL DEFAULT 1,
    Ordem     INT            NOT NULL DEFAULT 0
);

CREATE TABLE dbo.FerramentaRecurso (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    FerramentaId INT           NOT NULL REFERENCES dbo.Ferramenta(Id) ON DELETE CASCADE,
    Descricao    NVARCHAR(200) NOT NULL,
    Ordem        INT           NOT NULL DEFAULT 0
);

-- ---------- Dados enviados pelos visitantes ----------

CREATE TABLE dbo.Usuario (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Nome      NVARCHAR(150) NOT NULL,
    Email     NVARCHAR(254) NOT NULL UNIQUE,
    SenhaHash VARCHAR(100)  NULL,                       -- BCrypt; NULL em contas criadas só pelo Google
    GoogleSub VARCHAR(64)   NULL,                       -- campo "sub" do ID token do Google
    FotoUrl   NVARCHAR(500) NULL,
    CriadoEm  DATETIME2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE UNIQUE INDEX UX_Usuario_GoogleSub ON dbo.Usuario(GoogleSub) WHERE GoogleSub IS NOT NULL;

CREATE TABLE dbo.ContatoMensagem (
    Id       INT IDENTITY(1,1) PRIMARY KEY,
    Nome     NVARCHAR(150) NOT NULL,
    Email    NVARCHAR(254) NOT NULL,
    Assunto  NVARCHAR(200) NOT NULL,
    Mensagem NVARCHAR(MAX) NOT NULL,
    Lida     BIT           NOT NULL DEFAULT 0,
    CriadoEm DATETIME2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.NewsletterInscricao (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    Email          NVARCHAR(254) NOT NULL UNIQUE,
    DataNascimento DATE          NULL,
    CriadoEm       DATETIME2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);

-- ---------- Assinaturas e pagamentos ----------

CREATE TABLE dbo.Assinatura (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    PlanoId     INT           NOT NULL REFERENCES dbo.Plano(Id),
    UsuarioId   INT           NULL REFERENCES dbo.Usuario(Id),   -- o checkout não exige login
    Nome        NVARCHAR(150) NOT NULL,
    Email       NVARCHAR(254) NOT NULL,
    Telefone    VARCHAR(20)   NOT NULL,
    Cpf         VARCHAR(14)   NOT NULL,
    Empresa     NVARCHAR(150) NOT NULL,
    ValorMensal DECIMAL(10,2) NOT NULL,                 -- preço do plano no momento da compra
    Status      VARCHAR(20)   NOT NULL DEFAULT 'PENDENTE'
                CHECK (Status IN ('PENDENTE', 'ATIVA', 'CANCELADA')),
    CriadoEm    DATETIME2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Nunca grave número completo do cartão nem CVV: use o token/ID do gateway de pagamento.
CREATE TABLE dbo.Pagamento (
    Id                 INT IDENTITY(1,1) PRIMARY KEY,
    AssinaturaId       INT           NOT NULL REFERENCES dbo.Assinatura(Id),
    Metodo             VARCHAR(10)   NOT NULL CHECK (Metodo IN ('credito', 'debito', 'pix', 'boleto')),
    Parcelas           TINYINT       NOT NULL DEFAULT 1,
    Valor              DECIMAL(10,2) NOT NULL,
    Status             VARCHAR(20)   NOT NULL DEFAULT 'PENDENTE'
                       CHECK (Status IN ('PENDENTE', 'APROVADO', 'RECUSADO', 'ESTORNADO')),
    GatewayTransacaoId VARCHAR(100)  NULL,
    CartaoUltimos4     CHAR(4)       NULL,
    CriadoEm           DATETIME2(0)  NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE INDEX IX_PlanoBeneficio_Plano   ON dbo.PlanoBeneficio(PlanoId, Ordem);
CREATE INDEX IX_FerramentaRecurso_Ferr ON dbo.FerramentaRecurso(FerramentaId, Ordem);
CREATE INDEX IX_Assinatura_Email       ON dbo.Assinatura(Email);
CREATE INDEX IX_Pagamento_Assinatura   ON dbo.Pagamento(AssinaturaId);
GO

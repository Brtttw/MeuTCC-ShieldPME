/* =========================================================================
   ShieldPME - Script de criação do banco de dados (SQL Server / T-SQL)
   Curso Técnico em Informática - FIEB
   ========================================================================= */

CREATE DATABASE ShieldPME;
GO
USE ShieldPME;
GO

-- =========================================================================
-- 1. USUARIO (superclasse) e especializações ESTUDANTE / CLIENTE
-- =========================================================================
CREATE TABLE Usuario (
    Id_Usuario     INT IDENTITY(1,1) PRIMARY KEY,
    Email          VARCHAR(100) NOT NULL UNIQUE,
    Senha          VARCHAR(255) NOT NULL,          -- armazenar sempre com hash (ex.: bcrypt)
    Telefone       VARCHAR(15)  NOT NULL,
    Tipo_Usuario   VARCHAR(10)  NOT NULL CHECK (Tipo_Usuario IN ('Estudante','Cliente')),
    Data_Cadastro  DATETIME     NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE Estudante (
    CPF         VARCHAR(11) PRIMARY KEY,
    Id_Usuario  INT NOT NULL UNIQUE,
    RG          VARCHAR(9) UNIQUE,
    Nome        VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Estudante_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
);
GO

CREATE TABLE Planos (
    Id_Plano    INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Plano  VARCHAR(50) NOT NULL,
    Preco       DECIMAL(10,2) NOT NULL,
    Descricao   VARCHAR(255)
);
GO

CREATE TABLE Cliente (
    CNPJ           VARCHAR(14) PRIMARY KEY,
    Id_Usuario     INT NOT NULL UNIQUE,
    Razao_Social   VARCHAR(150) NOT NULL,
    IE             VARCHAR(20),
    Id_Plano       INT NULL,
    CONSTRAINT FK_Cliente_Usuario FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario),
    CONSTRAINT FK_Cliente_Plano   FOREIGN KEY (Id_Plano)   REFERENCES Planos(Id_Plano)
);
GO

-- =========================================================================
-- 2. SERVIÇOS oferecidos por cada plano (resolve N:N Planos x Serviços)
-- =========================================================================
CREATE TABLE Servicos (
    Id_Servico    INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Servico  VARCHAR(100) NOT NULL,   -- ex.: 'Teste OWASP Top 10', 'Pentest', 'BlueHat Defense'
    Descricao     VARCHAR(255)
);
GO

CREATE TABLE Plano_Servico (
    Id_Plano    INT NOT NULL,
    Id_Servico  INT NOT NULL,
    PRIMARY KEY (Id_Plano, Id_Servico),
    CONSTRAINT FK_PS_Plano   FOREIGN KEY (Id_Plano)   REFERENCES Planos(Id_Plano),
    CONSTRAINT FK_PS_Servico FOREIGN KEY (Id_Servico) REFERENCES Servicos(Id_Servico)
);
GO

-- =========================================================================
-- 3. CONTEÚDO educativo acessado pelos ESTUDANTES (resolve N:N)
-- =========================================================================
CREATE TABLE Conteudo (
    Id_Conteudo      INT IDENTITY(1,1) PRIMARY KEY,
    Titulo           VARCHAR(150) NOT NULL,
    Tipo             VARCHAR(20) NOT NULL CHECK (Tipo IN ('Quiz','Texto Educativo')),
    Corpo            VARCHAR(MAX),
    Data_Publicacao  DATETIME NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE Acessa (
    CPF          VARCHAR(11) NOT NULL,
    Id_Conteudo  INT NOT NULL,
    Data_Acesso  DATETIME NOT NULL DEFAULT GETDATE(),
    PRIMARY KEY (CPF, Id_Conteudo),
    CONSTRAINT FK_Acessa_Estudante FOREIGN KEY (CPF) REFERENCES Estudante(CPF),
    CONSTRAINT FK_Acessa_Conteudo  FOREIGN KEY (Id_Conteudo) REFERENCES Conteudo(Id_Conteudo)
);
GO

-- =========================================================================
-- 4. SITE, ANALISE, RELATORIO e VULNERABILIDADE (núcleo do produto - RF02 a RF05)
-- =========================================================================
CREATE TABLE Site (
    Id_Site        INT IDENTITY(1,1) PRIMARY KEY,
    CNPJ           VARCHAR(14) NOT NULL,
    URL            VARCHAR(255) NOT NULL,
    Data_Registro  DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Site_Cliente FOREIGN KEY (CNPJ) REFERENCES Cliente(CNPJ)
);
GO

CREATE TABLE Analise (
    Id_Analise        INT IDENTITY(1,1) PRIMARY KEY,
    Id_Site           INT NOT NULL,
    Data_Solicitacao  DATETIME NOT NULL DEFAULT GETDATE(),
    Status            VARCHAR(20) NOT NULL CHECK (Status IN ('Pendente','Em Andamento','Concluída')),
    Tipo_Analise      VARCHAR(20) CHECK (Tipo_Analise IN ('Automática','Manual')),
    CONSTRAINT FK_Analise_Site FOREIGN KEY (Id_Site) REFERENCES Site(Id_Site)
);
GO

CREATE TABLE Relatorio (
    Id_Relatorio        INT IDENTITY(1,1) PRIMARY KEY,
    Id_Analise          INT NOT NULL UNIQUE,        -- 1 relatório por análise
    Data_Geracao        DATETIME NOT NULL DEFAULT GETDATE(),
    Nivel_Risco_Geral    VARCHAR(10) CHECK (Nivel_Risco_Geral IN ('Baixo','Médio','Alto')),
    CONSTRAINT FK_Relatorio_Analise FOREIGN KEY (Id_Analise) REFERENCES Analise(Id_Analise)
);
GO

CREATE TABLE Vulnerabilidade (
    Id_Vulnerabilidade  INT IDENTITY(1,1) PRIMARY KEY,
    Id_Relatorio        INT NOT NULL,
    Descricao           VARCHAR(255) NOT NULL,
    Nivel_Risco          VARCHAR(10) NOT NULL CHECK (Nivel_Risco IN ('Baixo','Médio','Alto')),
    Recomendacao        VARCHAR(255),
    CONSTRAINT FK_Vulnerabilidade_Relatorio FOREIGN KEY (Id_Relatorio) REFERENCES Relatorio(Id_Relatorio)
);
GO

-- =========================================================================
-- 5. Dados iniciais (seed) para Serviços e Planos, conforme escopo do projeto
-- =========================================================================
INSERT INTO Servicos (Nome_Servico, Descricao) VALUES
 ('Teste OWASP Top 10', 'Varredura das 10 vulnerabilidades mais críticas segundo a OWASP'),
 ('Pentest', 'Teste de invasão manual/automatizado no site do cliente'),
 ('BlueHat Defense', 'Camada de monitoramento e defesa contínua');
GO

INSERT INTO Planos (Nome_Plano, Preco, Descricao) VALUES
 ('Basic',   99.90, 'Recursos essenciais de varredura automática'),
 ('Premium', 249.90, 'Inclui análises manuais e todos os serviços');
GO

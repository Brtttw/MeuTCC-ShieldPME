USE ShieldPME;

-- ============================================================
-- 01. ROLES
-- ============================================================

CREATE TABLE dbo.roles (
    id INT IDENTITY(1,1) NOT NULL,
    name NVARCHAR(35) NOT NULL,
    description NVARCHAR(255) NULL,

    CONSTRAINT pk_roles
        PRIMARY KEY (id),

    CONSTRAINT uq_roles_name
        UNIQUE (name)
);


-- ============================================================
-- 02. PERMISSIONS
-- ============================================================

CREATE TABLE dbo.permissions (
    id INT IDENTITY(1,1) NOT NULL,
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(255) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_permissions_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_permissions_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_permissions
        PRIMARY KEY (id),

    CONSTRAINT uq_permissions_name
        UNIQUE (name)
);


-- ============================================================
-- 03. ROLE_PERMISSIONS
-- ============================================================

CREATE TABLE dbo.role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,

    CONSTRAINT pk_role_permissions
        PRIMARY KEY (role_id, permission_id),

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES dbo.roles(id),

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES dbo.permissions(id)
);


-- ============================================================
-- 04. USERS
-- ============================================================

CREATE TABLE dbo.users (
    id INT IDENTITY(1,1) NOT NULL,

    email NVARCHAR(100) NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_users_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_users_updated_at
        DEFAULT SYSDATETIME(),

    role_id INT NOT NULL,

    CONSTRAINT pk_users
        PRIMARY KEY (id),

    CONSTRAINT uq_users_email
        UNIQUE (email),

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES dbo.roles(id)
);


-- ============================================================
-- 05. COMPANIES
-- ============================================================

CREATE TABLE dbo.companies (
    id INT IDENTITY(1,1) NOT NULL,

    name NVARCHAR(150) NOT NULL,
    cnpj CHAR(14) NOT NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_companies_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_companies_updated_at
        DEFAULT SYSDATETIME(),

    user_id INT NOT NULL,

    CONSTRAINT pk_companies
        PRIMARY KEY (id),

    CONSTRAINT uq_companies_cnpj
        UNIQUE (cnpj),

    CONSTRAINT fk_companies_user
        FOREIGN KEY (user_id)
        REFERENCES dbo.users(id)
);


-- ============================================================
-- 06. SITES
-- ============================================================

CREATE TABLE dbo.sites (
    id INT IDENTITY(1,1) NOT NULL,

    name NVARCHAR(100) NULL,
    url NVARCHAR(255) NOT NULL,
    backend_stack NVARCHAR(255) NULL,
    database_stack NVARCHAR(255) NULL,
    repository_url NVARCHAR(255) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_sites_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_sites_updated_at
        DEFAULT SYSDATETIME(),

    company_id INT NOT NULL,

    CONSTRAINT pk_sites
        PRIMARY KEY (id),

    CONSTRAINT uq_sites_url
        UNIQUE (url),

    CONSTRAINT fk_sites_company
        FOREIGN KEY (company_id)
        REFERENCES dbo.companies(id)
);


-- ============================================================
-- 07. SERVICES
-- ============================================================

CREATE TABLE dbo.services (
    id INT IDENTITY(1,1) NOT NULL,

    name NVARCHAR(50) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    is_active BIT NOT NULL
        CONSTRAINT df_services_is_active
        DEFAULT 1,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_services_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_services_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_services
        PRIMARY KEY (id),

    CONSTRAINT uq_services_name
        UNIQUE (name),

    CONSTRAINT ck_services_base_price
        CHECK (base_price >= 0)
);


-- ============================================================
-- 08. SERVICE_FREQUENCIES
-- ============================================================

CREATE TABLE dbo.service_frequencies (
    id INT IDENTITY(1,1) NOT NULL,

    name NVARCHAR(20) NOT NULL,
    interval_value SMALLINT NOT NULL,
    interval_unit NVARCHAR(10) NOT NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_service_frequencies_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_service_frequencies_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_service_frequencies
        PRIMARY KEY (id),

    CONSTRAINT uq_service_frequencies_name
        UNIQUE (name),

    CONSTRAINT ck_service_frequencies_interval_value
        CHECK (interval_value > 0),

    CONSTRAINT ck_service_frequencies_interval_unit
        CHECK (interval_unit IN ('WEEK', 'MONTH')),

    CONSTRAINT uq_service_frequencies_interval
        UNIQUE (interval_value, interval_unit)
);


-- ============================================================
-- 09. CONTRACTS
-- ============================================================

CREATE TABLE dbo.contracts (
    id INT IDENTITY(1,1) NOT NULL,

    company_id INT NOT NULL,

    status NVARCHAR(20) NOT NULL
        CONSTRAINT df_contracts_status
        DEFAULT 'PENDING',

    start_date DATE NULL,
    end_date DATE NULL,

    total_amount DECIMAL(12,2) NOT NULL
        CONSTRAINT df_contracts_total_amount
        DEFAULT 0,

    payment_status NVARCHAR(20) NOT NULL
        CONSTRAINT df_contracts_payment_status
        DEFAULT 'PENDING',

    paid_at DATETIME2(7) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_contracts_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_contracts_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_contracts
        PRIMARY KEY (id),

    CONSTRAINT fk_contracts_company
        FOREIGN KEY (company_id)
        REFERENCES dbo.companies(id),

    CONSTRAINT ck_contracts_status
        CHECK (
            status IN (
                'PENDING',
                'ACTIVE',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    CONSTRAINT ck_contracts_payment_status
        CHECK (
            payment_status IN (
                'PENDING',
                'PAID',
                'CANCELLED'
            )
        ),

    CONSTRAINT ck_contracts_total_amount
        CHECK (total_amount >= 0),

    CONSTRAINT ck_contracts_dates
        CHECK (
            end_date IS NULL
            OR start_date IS NULL
            OR end_date >= start_date
        )
);


-- ============================================================
-- 10. CONTRACT_SERVICES
-- ============================================================

CREATE TABLE dbo.contract_services (
    id INT IDENTITY(1,1) NOT NULL,

    contract_id INT NOT NULL,
    service_id INT NOT NULL,
    site_id INT NOT NULL,
    frequency_id INT NOT NULL,

    duration_intervals SMALLINT NOT NULL,

    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) NOT NULL
        CONSTRAINT df_contract_services_discount_percent
        DEFAULT 0,

    total_price DECIMAL(12,2) NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_contract_services_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_contract_services_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_contract_services
        PRIMARY KEY (id),

    CONSTRAINT fk_contract_services_contract
        FOREIGN KEY (contract_id)
        REFERENCES dbo.contracts(id),

    CONSTRAINT fk_contract_services_service
        FOREIGN KEY (service_id)
        REFERENCES dbo.services(id),

    CONSTRAINT fk_contract_services_site
        FOREIGN KEY (site_id)
        REFERENCES dbo.sites(id),

    CONSTRAINT fk_contract_services_frequency
        FOREIGN KEY (frequency_id)
        REFERENCES dbo.service_frequencies(id),

    CONSTRAINT ck_contract_services_duration
        CHECK (duration_intervals > 0),

    CONSTRAINT ck_contract_services_unit_price
        CHECK (unit_price >= 0),

    CONSTRAINT ck_contract_services_discount
        CHECK (
            discount_percent >= 0
            AND discount_percent <= 100
        ),

    CONSTRAINT ck_contract_services_total_price
        CHECK (total_price >= 0),

    CONSTRAINT ck_contract_services_dates
        CHECK (end_date >= start_date)
);


-- ============================================================
-- 11. EMPLOYEES
-- ============================================================

CREATE TABLE dbo.employees (
    id INT IDENTITY(1,1) NOT NULL,

    name NVARCHAR(150) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20) NULL,

    is_active BIT NOT NULL
        CONSTRAINT df_employees_is_active
        DEFAULT 1,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_employees_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_employees_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_employees
        PRIMARY KEY (id),

    CONSTRAINT uq_employees_email
        UNIQUE (email)
);


-- ============================================================
-- 12. SERVICE_EXECUTIONS
-- ============================================================

CREATE TABLE dbo.service_executions (
    id INT IDENTITY(1,1) NOT NULL,

    contract_service_id INT NOT NULL,

    execution_number SMALLINT NOT NULL,

    due_date DATE NOT NULL,
    release_date DATE NOT NULL,

    started_at DATETIME2(7) NULL,
    completed_at DATETIME2(7) NULL,

    status NVARCHAR(20) NOT NULL
        CONSTRAINT df_service_executions_status
        DEFAULT 'PENDING',

    notes NVARCHAR(MAX) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_service_executions_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_service_executions_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_service_executions
        PRIMARY KEY (id),

    CONSTRAINT fk_service_executions_contract_service
        FOREIGN KEY (contract_service_id)
        REFERENCES dbo.contract_services(id),

    CONSTRAINT uq_service_executions_number
        UNIQUE (contract_service_id, execution_number),

    CONSTRAINT ck_service_executions_number
        CHECK (execution_number > 0),

    CONSTRAINT ck_service_executions_status
        CHECK (
            status IN (
                'PENDING',
                'RUNNING',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    CONSTRAINT ck_service_executions_dates
        CHECK (release_date >= due_date)
);


-- ============================================================
-- 13. EXECUTION_ASSIGNMENTS
-- ============================================================

CREATE TABLE dbo.execution_assignments (
    id INT IDENTITY(1,1) NOT NULL,

    service_execution_id INT NOT NULL,
    employee_id INT NOT NULL,

    assigned_at DATETIME2(7) NOT NULL
        CONSTRAINT df_execution_assignments_assigned_at
        DEFAULT SYSDATETIME(),

    completed_at DATETIME2(7) NULL,

    is_lead BIT NOT NULL
        CONSTRAINT df_execution_assignments_is_lead
        DEFAULT 0,

    CONSTRAINT pk_execution_assignments
        PRIMARY KEY (id),

    CONSTRAINT fk_execution_assignments_execution
        FOREIGN KEY (service_execution_id)
        REFERENCES dbo.service_executions(id),

    CONSTRAINT fk_execution_assignments_employee
        FOREIGN KEY (employee_id)
        REFERENCES dbo.employees(id),

    CONSTRAINT uq_execution_assignments_employee
        UNIQUE (service_execution_id, employee_id)
);


-- ============================================================
-- 14. REPORTS
-- ============================================================

CREATE TABLE dbo.reports (
    id INT IDENTITY(1,1) NOT NULL,

    service_execution_id INT NOT NULL,
    responsible_employee_id INT NULL,

    title NVARCHAR(200) NOT NULL,
    file_name NVARCHAR(255) NULL,
    file_path NVARCHAR(500) NULL,

    status NVARCHAR(20) NOT NULL
        CONSTRAINT df_reports_status
        DEFAULT 'DRAFT',

    generated_at DATETIME2(7) NULL,
    released_at DATETIME2(7) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_reports_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_reports_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_reports
        PRIMARY KEY (id),

    CONSTRAINT fk_reports_service_execution
        FOREIGN KEY (service_execution_id)
        REFERENCES dbo.service_executions(id),

    CONSTRAINT fk_reports_responsible_employee
        FOREIGN KEY (responsible_employee_id)
        REFERENCES dbo.employees(id),

    CONSTRAINT uq_reports_service_execution
        UNIQUE (service_execution_id),

    CONSTRAINT ck_reports_status
        CHECK (
            status IN (
                'DRAFT',
                'READY',
                'RELEASED'
            )
        )
);


-- ============================================================
-- 15. REPORT_SECTIONS
-- ============================================================

CREATE TABLE dbo.report_sections (
    id INT IDENTITY(1,1) NOT NULL,

    report_id INT NOT NULL,

    title NVARCHAR(200) NOT NULL,
    content NVARCHAR(MAX) NULL,

    section_order INT NOT NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_report_sections_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_report_sections_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_report_sections
        PRIMARY KEY (id),

    CONSTRAINT fk_report_sections_report
        FOREIGN KEY (report_id)
        REFERENCES dbo.reports(id),

    CONSTRAINT uq_report_sections_order
        UNIQUE (report_id, section_order),

    CONSTRAINT ck_report_sections_order
        CHECK (section_order > 0)
);


-- ============================================================
-- 16. SYSTEM_SETTINGS
-- ============================================================

CREATE TABLE dbo.system_settings (
    id INT IDENTITY(1,1) NOT NULL,

    setting_key NVARCHAR(100) NOT NULL,
    setting_value NVARCHAR(MAX) NULL,
    description NVARCHAR(255) NULL,

    created_at DATETIME2(7) NOT NULL
        CONSTRAINT df_system_settings_created_at
        DEFAULT SYSDATETIME(),

    updated_at DATETIME2(7) NOT NULL
        CONSTRAINT df_system_settings_updated_at
        DEFAULT SYSDATETIME(),

    CONSTRAINT pk_system_settings
        PRIMARY KEY (id),

    CONSTRAINT uq_system_settings_key
        UNIQUE (setting_key)
);


USE ShieldPME;

-- ============================================================
-- ============================================================
-- SEEDS
-- ============================================================
-- Dados iniciais necessários para o funcionamento do sistema.
--
-- As tabelas operacionais (companies, sites, contracts,
-- executions, reports etc.) não recebem dados fictícios aqui.
-- Elas serão preenchidas pela aplicação durante o uso.
--
-- ============================================================


-- ============================================================
-- 01. ROLES
-- ============================================================

INSERT INTO dbo.roles (
    name,
    description
)
VALUES
(
    'ADMIN',
    'Administrador do sistema com acesso administrativo.'
),
(
    'CLIENT',
    'Usuário responsável por uma empresa cliente.'
),
(
    'EMPLOYEE',
    'Funcionário da ShieldPME responsável pela execução de serviços.'
);


-- ============================================================
-- 02. PERMISSIONS
-- ============================================================

INSERT INTO dbo.permissions (
    name,
    description
)
VALUES

-- Usuários
(
    'USER_READ',
    'Permite visualizar usuários.'
),
(
    'USER_CREATE',
    'Permite criar usuários.'
),
(
    'USER_UPDATE',
    'Permite atualizar usuários.'
),
(
    'USER_DELETE',
    'Permite remover usuários.'
),

-- Empresas
(
    'COMPANY_READ',
    'Permite visualizar empresas.'
),
(
    'COMPANY_CREATE',
    'Permite cadastrar empresas.'
),
(
    'COMPANY_UPDATE',
    'Permite atualizar empresas.'
),
(
    'COMPANY_DELETE',
    'Permite remover empresas.'
),

-- Sites
(
    'SITE_READ',
    'Permite visualizar sites.'
),
(
    'SITE_CREATE',
    'Permite cadastrar sites.'
),
(
    'SITE_UPDATE',
    'Permite atualizar sites.'
),
(
    'SITE_DELETE',
    'Permite remover sites.'
),

-- Serviços
(
    'SERVICE_READ',
    'Permite visualizar os serviços oferecidos pela ShieldPME.'
),
(
    'SERVICE_CREATE',
    'Permite cadastrar serviços.'
),
(
    'SERVICE_UPDATE',
    'Permite atualizar serviços.'
),
(
    'SERVICE_DELETE',
    'Permite remover serviços.'
),

-- Contratos
(
    'CONTRACT_READ',
    'Permite visualizar contratos.'
),
(
    'CONTRACT_CREATE',
    'Permite criar contratos.'
),
(
    'CONTRACT_UPDATE',
    'Permite atualizar contratos.'
),
(
    'CONTRACT_CANCEL',
    'Permite cancelar contratos.'
),

-- Execuções
(
    'EXECUTION_READ',
    'Permite visualizar execuções de serviços.'
),
(
    'EXECUTION_CREATE',
    'Permite registrar execuções de serviços.'
),
(
    'EXECUTION_UPDATE',
    'Permite atualizar execuções de serviços.'
),

-- Funcionários
(
    'EMPLOYEE_READ',
    'Permite visualizar funcionários.'
),
(
    'EMPLOYEE_CREATE',
    'Permite cadastrar funcionários.'
),
(
    'EMPLOYEE_UPDATE',
    'Permite atualizar funcionários.'
),
(
    'EMPLOYEE_DELETE',
    'Permite remover funcionários.'
),

-- Relatórios
(
    'REPORT_READ',
    'Permite visualizar relatórios.'
),
(
    'REPORT_CREATE',
    'Permite criar relatórios.'
),
(
    'REPORT_UPDATE',
    'Permite atualizar relatórios.'
),
(
    'REPORT_RELEASE',
    'Permite liberar relatórios para clientes.'
);


-- ============================================================
-- 03. ROLE_PERMISSIONS
-- ============================================================

-- ------------------------------------------------------------
-- ADMIN
-- ------------------------------------------------------------

INSERT INTO dbo.role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM dbo.roles r
CROSS JOIN dbo.permissions p
WHERE r.name = 'ADMIN';


-- ------------------------------------------------------------
-- CLIENT
-- ------------------------------------------------------------

INSERT INTO dbo.role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM dbo.roles r
INNER JOIN dbo.permissions p
    ON p.name IN (
        'COMPANY_READ',
        'COMPANY_CREATE',
        'COMPANY_UPDATE',

        'SITE_READ',
        'SITE_CREATE',
        'SITE_UPDATE',

        'SERVICE_READ',

        'CONTRACT_READ',
        'CONTRACT_CREATE',
        'CONTRACT_UPDATE',
        'CONTRACT_CANCEL',

        'EXECUTION_READ',

        'REPORT_READ'
    )
WHERE r.name = 'CLIENT';


-- ------------------------------------------------------------
-- EMPLOYEE
-- ------------------------------------------------------------

INSERT INTO dbo.role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM dbo.roles r
INNER JOIN dbo.permissions p
    ON p.name IN (
        'COMPANY_READ',
        'SITE_READ',

        'SERVICE_READ',

        'CONTRACT_READ',

        'EXECUTION_READ',
        'EXECUTION_CREATE',
        'EXECUTION_UPDATE',

        'EMPLOYEE_READ',

        'REPORT_READ',
        'REPORT_CREATE',
        'REPORT_UPDATE',
        'REPORT_RELEASE'
    )
WHERE r.name = 'EMPLOYEE';


-- ============================================================
-- 04. OWNER
-- ============================================================

/*
    Usuário administrativo inicial do sistema.

    IMPORTANTE:
    O valor de password_hash abaixo deve ser um hash BCrypt
    gerado pela aplicação/Spring Security.

    Não devemos armazenar uma senha em texto puro no banco.

    O hash abaixo é apenas um valor de desenvolvimento.
    Substitua-o pelo hash que você gerar para o usuário owner.
*/

INSERT INTO dbo.users (
    email,
    password_hash,
    phone,
    role_id
)
SELECT
    'owner@shieldpme.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    NULL,
    r.id
FROM dbo.roles r
WHERE r.name = 'ADMIN';


-- ============================================================
-- 05. SERVICES
-- ============================================================

INSERT INTO dbo.services (
    name,
    base_price,
    description,
    is_active
)
VALUES

(
    'Pentest',
    1500.00,
    'Teste de segurança autorizado que simula técnicas utilizadas por atacantes para identificar e validar vulnerabilidades em um sistema dentro de um escopo definido.',
    1
),

(
    'OWASP ZAP',
    500.00,
    'Análise de segurança de aplicações web utilizando o OWASP ZAP, com execução da ferramenta, análise dos resultados, validação de achados e elaboração do relatório.',
    1
),

(
    'Nuclei',
    500.00,
    'Avaliação automatizada de vulnerabilidades e exposições conhecidas utilizando templates do Nuclei, com validação e interpretação dos resultados por um profissional.',
    1
),

(
    'Secure Code Review',
    1200.00,
    'Análise do código-fonte de uma aplicação para identificar vulnerabilidades relacionadas a autenticação, autorização, entrada de dados, criptografia, segredos, dependências e lógica de segurança.',
    1
),

(
    'Blue Team',
    1800.00,
    'Serviço de segurança defensiva voltado à identificação, investigação e resposta a eventos de segurança, além da melhoria dos mecanismos de proteção do ambiente analisado.',
    1
),

(
    'Red Team',
    2500.00,
    'Simulação controlada de um adversário real para avaliar até onde um atacante autorizado poderia avançar dentro de um escopo previamente definido.',
    1
),

(
    'Vulnerability Assessment',
    800.00,
    'Avaliação destinada a identificar, organizar e priorizar vulnerabilidades e exposições de segurança em um ambiente definido.',
    1
);


-- ============================================================
-- 06. SERVICE_FREQUENCIES
-- ============================================================

INSERT INTO dbo.service_frequencies (
    name,
    interval_value,
    interval_unit
)
VALUES
(
    'Weekly',
    1,
    'WEEK'
),
(
    'Monthly',
    1,
    'MONTH'
);


-- ============================================================
-- 07. SYSTEM_SETTINGS
-- ============================================================

INSERT INTO dbo.system_settings (
    setting_key,
    setting_value,
    description
)
VALUES
(
    'SYSTEM_NAME',
    'ShieldPME',
    'Nome oficial da aplicação.'
),
(
    'DEFAULT_REPORT_FORMAT',
    'PDF',
    'Formato padrão utilizado para os relatórios.'
),
(
    'DEFAULT_CURRENCY',
    'BRL',
    'Moeda utilizada pelos valores comerciais do sistema.'
);

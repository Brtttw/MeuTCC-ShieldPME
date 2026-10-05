-- ShieldPME - dados iniciais (gerado a partir de src/data). Execute depois de schema.sql.
USE ShieldPME;
GO

-- Planos
SET IDENTITY_INSERT dbo.Plano ON;
INSERT INTO dbo.Plano (Id, Codigo, Nome, Descricao, PrecoMensal, PrecoAnual, Destaque, Ordem) VALUES (1, N'plus', N'PLUS', N'Comece sua jornada segura agora! Ideal para pequenas empresas que desejam segurança acessível sem comprometer a qualidade. Proteja seus dados desde o primeiro dia!', 122, 1464, 0, 1);
INSERT INTO dbo.Plano (Id, Codigo, Nome, Descricao, PrecoMensal, PrecoAnual, Destaque, Ordem) VALUES (2, N'pro', N'PRO', N'A escolha inteligente para empresas em crescimento! Ganhe tranquilidade total com suporte prioritário. Milhares de empresas confiam neste plano!', 161, 1932, 1, 2);
INSERT INTO dbo.Plano (Id, Codigo, Nome, Descricao, PrecoMensal, PrecoAnual, Destaque, Ordem) VALUES (3, N'ultra', N'ULTRA', N'Máxima segurança corporativa para empresas exigentes! Invista na proteção total da sua infraestrutura digital!', 256, 3072, 0, 3);
SET IDENTITY_INSERT dbo.Plano OFF;

-- Benefícios dos planos
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (1, N'Monitoramento básico', 1);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (1, N'Firewall padrão', 2);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (1, N'Relatórios mensais', 3);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (1, N'Suporte por email', 4);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (2, N'Monitoramento 24/7', 1);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (2, N'Firewall avançado', 2);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (2, N'Análise de vulnerabilidade', 3);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (2, N'Relatórios semanais', 4);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (2, N'Suporte prioritário', 5);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (3, N'Segurança completa', 1);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (3, N'Proteção de servidores', 2);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (3, N'IA de detecção de ataques', 3);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (3, N'Auditoria de segurança', 4);
INSERT INTO dbo.PlanoBeneficio (PlanoId, Descricao, Ordem) VALUES (3, N'Suporte dedicado', 5);

-- Serviços
SET IDENTITY_INSERT dbo.Servico ON;
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (1, N'Monitoramento', N'Monitoramento contínuo contra ataques.', N'monitoramento.png', N'Monitoramento 24/7', 1);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (2, N'Firewall Corporativo', N'Bloqueio avançado de invasões.', N'firewall.png', N'Firewall Corporativo', 2);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (3, N'Análise de Vulnerabilidade', N'Detectamos falhas antes de hackers.', N'analise.png', N'Análise de Vulnerabilidade', 3);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (4, N'Proteção de Dados', N'Segurança completa para bancos de dados.', N'protecao.png', N'Proteção de Dados', 4);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (5, N'Consultoria em Conformidade', N'Assessoria especializada para atender regulamentações como LGPD e ISO 27001.', N'consultoria.png', N'Consultoria em Conformidade', 5);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (6, N'Resposta a Incidentes', N'Plano de ação rápido para mitigar e recuperar de ciberataques.', N'respostas.png', N'Resposta a Incidentes', 6);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (7, N'Segurança na Nuvem', N'Proteção avançada para ambientes cloud e dados migrados.', N'nuvem.png', N'Segurança na Nuvem', 7);
INSERT INTO dbo.Servico (Id, Titulo, Descricao, IconeArquivo, TextoAlternativo, Ordem) VALUES (8, N'Gestão de Riscos', N'Identificação e mitigação proativa de vulnerabilidades empresariais.', N'gestao.png', N'Gestão de Riscos', 8);
SET IDENTITY_INSERT dbo.Servico OFF;

-- Postagens do blog
SET IDENTITY_INSERT dbo.Postagem ON;
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (1, N'Novo Ataque de Ransomware Afeta Milhares de Empresas', N'Um novo strain de ransomware tem se espalhado rapidamente por infraestruturas corporativas. Entenda como a ShieldPME está protegendo seus clientes.', '2026-01-15', N'blog1.jpg', N'Ataque Ransomware');
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (2, N'Atualizações da LGPD para 2026: O Que Mudou', N'As novas regulamentações de proteção de dados entram em vigor este ano. Veja o que sua empresa precisa fazer para se manter em conformidade.', '2026-01-10', N'blog2.jpg', N'LGPD 2026');
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (3, N'Inteligência Artificial Revoluciona a Detecção de Ameaças', N'Nossos algoritmos de IA identificaram mais de 10 mil tentativas de invasão no último mês. Conheça a tecnologia por trás dessa proteção.', '2026-01-05', N'blog3.jpg', N'IA na Segurança');
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (4, N'Case de Sucesso: Como Salvamos uma Fintech de um Ataque DDoS', N'Leia o relato completo de como nossa equipe neutralizou um ataque massivo em tempo recorde, evitando prejuízos milionários.', '2025-12-28', N'blog4.jpg', N'Case de Sucesso');
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (5, N'5 Práticas Essenciais para Criar Senhas Invioláveis', N'Ainda usa "123456"? Descubra as melhores técnicas para criar credenciais robustas e proteger suas contas corporativas.', '2025-12-20', N'blog5.jpg', N'Senhas Seguras');
INSERT INTO dbo.Postagem (Id, Titulo, Resumo, PublicadoEm, ImagemArquivo, TextoAlternativo) VALUES (6, N'Segurança na Nuvem: Mitos e Verdades', N'A migração para a nuvem é segura? Desmistificamos os principais mitos e mostramos como proteger seus dados em ambientes cloud.', '2025-12-15', N'blog6.jpg', N'Nuvem Segura');
SET IDENTITY_INSERT dbo.Postagem OFF;

-- Ferramentas
SET IDENTITY_INSERT dbo.Ferramenta ON;
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (1, N'Wireshark', N'Wireshark é o analisador de protocolos de rede mais popular do mundo. Utilizamos esta ferramenta para capturar e inspecionar pacotes de dados em tempo real, permitindo diagnosticar problemas de rede, detectar tráfego suspeito e identificar tentativas de exfiltração de dados. Nossa equipe utiliza Wireshark em investigações forenses e para monitoramento contínuo da integridade das comunicações corporativas.', 1);
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (2, N'Nmap', N'Nmap (Network Mapper) é a ferramenta padrão da indústria para descoberta de redes e auditoria de segurança. Utilizamos Nmap para mapear completamente a infraestrutura de rede dos nossos clientes, identificar dispositivos conectados, portas abertas e serviços em execução. Esta ferramenta é essencial para nossas avaliações de vulnerabilidade iniciais e para manter um inventário atualizado de ativos digitais.', 2);
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (3, N'Metasploit Framework', N'O Metasploit Framework é a plataforma líder mundial para testes de penetração e desenvolvimento de exploits. Nossa equipe de red team utiliza o Metasploit para simular ataques reais em ambientes controlados, identificando vulnerabilidades antes que criminosos cibernéticos possam explorá-las. Todos os testes são realizados com autorização prévia e seguem rigorosos protocolos éticos.', 3);
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (4, N'Burp Suite', N'Burp Suite é a ferramenta definitiva para testes de segurança de aplicações web. Utilizamos Burp Suite para identificar vulnerabilidades em APIs, aplicações web e serviços cloud dos nossos clientes. A ferramenta permite interceptar, inspecionar e modificar tráfego HTTP/HTTPS, automatizando a descoberta de falhas como SQL Injection, XSS e CSRF.', 4);
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (5, N'Snort', N'Snort é um sistema de detecção e prevenção de intrusões (IDS/IPS) de código aberto amplamente utilizado em ambientes corporativos. Implementamos Snort em nossas soluções de monitoramento 24/7 para analisar tráfego de rede em busca de assinaturas de ataques conhecidos, anomalias de comportamento e padrões de malware. A ferramenta é constantemente atualizada com as últimas regras de detecção.', 5);
INSERT INTO dbo.Ferramenta (Id, Nome, Descricao, Ordem) VALUES (6, N'OSSEC', N'OSSEC é uma plataforma de detecção de intrusões baseada em host (HIDS) que monitora logs, integridade de arquivos e atividades de processos em servidores e endpoints. Utilizamos OSSEC para garantir que qualquer alteração não autorizada em sistemas críticos seja detectada imediatamente, desde modificações em arquivos de configuração até execução de comandos suspeitos.', 6);
SET IDENTITY_INSERT dbo.Ferramenta OFF;

-- Recursos das ferramentas
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (1, N'Análise profunda de mais de 2.000 protocolos de rede', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (1, N'Captura de pacotes em tempo real com filtros avançados', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (1, N'Decodificação de tráfego criptografado para análise de metadados', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (1, N'Geração de relatórios detalhados de anomalias de rede', 4);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (2, N'Varredura de portas TCP/UDP com técnicas de evasão de firewall', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (2, N'Detecção de sistemas operacionais e versões de serviços', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (2, N'Scripts NSE (Nmap Scripting Engine) para verificação de vulnerabilidades', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (2, N'Geração de topologias de rede visuais para documentação', 4);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (3, N'Execução de testes de penetração automatizados e manuais', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (3, N'Desenvolvimento de exploits customizados para ambientes específicos', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (3, N'Simulação de ataques de engenharia social e spear phishing', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (3, N'Relatórios executivos com métricas de risco e recomendações', 4);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (4, N'Proxy de interceptação para análise de requisições web', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (4, N'Scanner automatizado de vulnerabilidades OWASP Top 10', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (4, N'Extensões customizadas para testes de APIs REST e GraphQL', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (4, N'Relatórios de conformidade com padrões PCI-DSS e ISO 27001', 4);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (5, N'Detecção em tempo real de tentativas de intrusão e malware', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (5, N'Regras customizadas baseadas no perfil de risco de cada cliente', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (5, N'Integração com SIEM para correlação de eventos de segurança', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (5, N'Bloqueio automático de tráfego malicioso em modo IPS', 4);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (6, N'Monitoramento de integridade de arquivos críticos do sistema', 1);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (6, N'Análise de logs de múltiplas fontes em tempo real', 2);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (6, N'Detecção de rootkits e atividades de privilege escalation', 3);
INSERT INTO dbo.FerramentaRecurso (FerramentaId, Descricao, Ordem) VALUES (6, N'Resposta automática a incidentes com isolamento de hosts', 4);
GO

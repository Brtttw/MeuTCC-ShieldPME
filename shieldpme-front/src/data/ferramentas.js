// Formato esperado de GET /api/ferramentas (tabelas Ferramenta + FerramentaRecurso)

export const paginaFerramentas = {
  titulo: 'Ferramentas de Cibersegurança',
  introducao: 'A ShieldPME utiliza um arsenal de ferramentas profissionais de cibersegurança para garantir a máxima proteção dos dados e infraestrutura dos nossos clientes. Cada ferramenta é escolhida criteriosamente por nossa equipe de especialistas e integrada de forma customizada às necessidades específicas de cada empresa. Conheça abaixo as principais tecnologias que utilizamos em nossas operações diárias de defesa digital.',
};

export const ferramentas = [
  {
    id: 1,
    nome: 'Wireshark',
    descricao: 'Wireshark é o analisador de protocolos de rede mais popular do mundo. Utilizamos esta ferramenta para capturar e inspecionar pacotes de dados em tempo real, permitindo diagnosticar problemas de rede, detectar tráfego suspeito e identificar tentativas de exfiltração de dados. Nossa equipe utiliza Wireshark em investigações forenses e para monitoramento contínuo da integridade das comunicações corporativas.',
    recursos: [
      'Análise profunda de mais de 2.000 protocolos de rede',
      'Captura de pacotes em tempo real com filtros avançados',
      'Decodificação de tráfego criptografado para análise de metadados',
      'Geração de relatórios detalhados de anomalias de rede',
    ],
  },
  {
    id: 2,
    nome: 'Nmap',
    descricao: 'Nmap (Network Mapper) é a ferramenta padrão da indústria para descoberta de redes e auditoria de segurança. Utilizamos Nmap para mapear completamente a infraestrutura de rede dos nossos clientes, identificar dispositivos conectados, portas abertas e serviços em execução. Esta ferramenta é essencial para nossas avaliações de vulnerabilidade iniciais e para manter um inventário atualizado de ativos digitais.',
    recursos: [
      'Varredura de portas TCP/UDP com técnicas de evasão de firewall',
      'Detecção de sistemas operacionais e versões de serviços',
      'Scripts NSE (Nmap Scripting Engine) para verificação de vulnerabilidades',
      'Geração de topologias de rede visuais para documentação',
    ],
  },
  {
    id: 3,
    nome: 'Metasploit Framework',
    descricao: 'O Metasploit Framework é a plataforma líder mundial para testes de penetração e desenvolvimento de exploits. Nossa equipe de red team utiliza o Metasploit para simular ataques reais em ambientes controlados, identificando vulnerabilidades antes que criminosos cibernéticos possam explorá-las. Todos os testes são realizados com autorização prévia e seguem rigorosos protocolos éticos.',
    recursos: [
      'Execução de testes de penetração automatizados e manuais',
      'Desenvolvimento de exploits customizados para ambientes específicos',
      'Simulação de ataques de engenharia social e spear phishing',
      'Relatórios executivos com métricas de risco e recomendações',
    ],
  },
  {
    id: 4,
    nome: 'Burp Suite',
    descricao: 'Burp Suite é a ferramenta definitiva para testes de segurança de aplicações web. Utilizamos Burp Suite para identificar vulnerabilidades em APIs, aplicações web e serviços cloud dos nossos clientes. A ferramenta permite interceptar, inspecionar e modificar tráfego HTTP/HTTPS, automatizando a descoberta de falhas como SQL Injection, XSS e CSRF.',
    recursos: [
      'Proxy de interceptação para análise de requisições web',
      'Scanner automatizado de vulnerabilidades OWASP Top 10',
      'Extensões customizadas para testes de APIs REST e GraphQL',
      'Relatórios de conformidade com padrões PCI-DSS e ISO 27001',
    ],
  },
  {
    id: 5,
    nome: 'Snort',
    descricao: 'Snort é um sistema de detecção e prevenção de intrusões (IDS/IPS) de código aberto amplamente utilizado em ambientes corporativos. Implementamos Snort em nossas soluções de monitoramento 24/7 para analisar tráfego de rede em busca de assinaturas de ataques conhecidos, anomalias de comportamento e padrões de malware. A ferramenta é constantemente atualizada com as últimas regras de detecção.',
    recursos: [
      'Detecção em tempo real de tentativas de intrusão e malware',
      'Regras customizadas baseadas no perfil de risco de cada cliente',
      'Integração com SIEM para correlação de eventos de segurança',
      'Bloqueio automático de tráfego malicioso em modo IPS',
    ],
  },
  {
    id: 6,
    nome: 'OSSEC',
    descricao: 'OSSEC é uma plataforma de detecção de intrusões baseada em host (HIDS) que monitora logs, integridade de arquivos e atividades de processos em servidores e endpoints. Utilizamos OSSEC para garantir que qualquer alteração não autorizada em sistemas críticos seja detectada imediatamente, desde modificações em arquivos de configuração até execução de comandos suspeitos.',
    recursos: [
      'Monitoramento de integridade de arquivos críticos do sistema',
      'Análise de logs de múltiplas fontes em tempo real',
      'Detecção de rootkits e atividades de privilege escalation',
      'Resposta automática a incidentes com isolamento de hosts',
    ],
  },
];

// Formato esperado de GET /api/planos (tabelas Plano + PlanoBeneficio)

export const planos = [
  {
    id: 1,
    codigo: 'plus',
    nome: 'PLUS',
    descricao: 'Comece sua jornada segura agora! Ideal para pequenas empresas que desejam segurança acessível sem comprometer a qualidade. Proteja seus dados desde o primeiro dia!',
    precoMensal: 122,
    precoAnual: 1464,
    destaque: false,
    beneficios: [
      'Monitoramento básico',
      'Firewall padrão',
      'Relatórios mensais',
      'Suporte por email',
    ],
  },
  {
    id: 2,
    codigo: 'pro',
    nome: 'PRO',
    descricao: 'A escolha inteligente para empresas em crescimento! Ganhe tranquilidade total com suporte prioritário. Milhares de empresas confiam neste plano!',
    precoMensal: 161,
    precoAnual: 1932,
    destaque: true,
    beneficios: [
      'Monitoramento 24/7',
      'Firewall avançado',
      'Análise de vulnerabilidade',
      'Relatórios semanais',
      'Suporte prioritário',
    ],
  },
  {
    id: 3,
    codigo: 'ultra',
    nome: 'ULTRA',
    descricao: 'Máxima segurança corporativa para empresas exigentes! Invista na proteção total da sua infraestrutura digital!',
    precoMensal: 256,
    precoAnual: 3072,
    destaque: false,
    beneficios: [
      'Segurança completa',
      'Proteção de servidores',
      'IA de detecção de ataques',
      'Auditoria de segurança',
      'Suporte dedicado',
    ],
  },
];

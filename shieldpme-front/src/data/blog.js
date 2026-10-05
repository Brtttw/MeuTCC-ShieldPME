// Formato esperado de GET /api/blog/posts (tabela Postagem)

export const paginaBlog = {
  titulo: 'Blog ShieldPME',
  introducao: 'Bem-vindo ao Blog ShieldPME, o canal oficial de comunicação da nossa empresa com o universo da cibersegurança. Aqui, publicamos conteúdos exclusivos sobre as últimas ameaças digitais, tendências de proteção de dados, análises de incidentes reais e dicas práticas para empresas de todos os portes. Nosso objetivo é manter você informado e preparado para enfrentar os desafios do cenário cibernético atual, com informações verificadas por nossos especialistas e baseadas em dados reais do mercado.',
};

export const ultimasNoticias = {
  titulo: 'Últimas Notícias',
  texto: 'Fique por dentro das novidades mais recentes sobre segurança digital, atualizações da ShieldPME e cases de sucesso.',
};

export const posts = [
  {
    id: 1,
    titulo: 'Novo Ataque de Ransomware Afeta Milhares de Empresas',
    resumo: 'Um novo strain de ransomware tem se espalhado rapidamente por infraestruturas corporativas. Entenda como a ShieldPME está protegendo seus clientes.',
    data: '2026-01-15',
    imagem: 'blog1.jpg',
    textoAlternativo: 'Ataque Ransomware',
  },
  {
    id: 2,
    titulo: 'Atualizações da LGPD para 2026: O Que Mudou',
    resumo: 'As novas regulamentações de proteção de dados entram em vigor este ano. Veja o que sua empresa precisa fazer para se manter em conformidade.',
    data: '2026-01-10',
    imagem: 'blog2.jpg',
    textoAlternativo: 'LGPD 2026',
  },
  {
    id: 3,
    titulo: 'Inteligência Artificial Revoluciona a Detecção de Ameaças',
    resumo: 'Nossos algoritmos de IA identificaram mais de 10 mil tentativas de invasão no último mês. Conheça a tecnologia por trás dessa proteção.',
    data: '2026-01-05',
    imagem: 'blog3.jpg',
    textoAlternativo: 'IA na Segurança',
  },
  {
    id: 4,
    titulo: 'Case de Sucesso: Como Salvamos uma Fintech de um Ataque DDoS',
    resumo: 'Leia o relato completo de como nossa equipe neutralizou um ataque massivo em tempo recorde, evitando prejuízos milionários.',
    data: '2025-12-28',
    imagem: 'blog4.jpg',
    textoAlternativo: 'Case de Sucesso',
  },
  {
    id: 5,
    titulo: '5 Práticas Essenciais para Criar Senhas Invioláveis',
    resumo: 'Ainda usa "123456"? Descubra as melhores técnicas para criar credenciais robustas e proteger suas contas corporativas.',
    data: '2025-12-20',
    imagem: 'blog5.jpg',
    textoAlternativo: 'Senhas Seguras',
  },
  {
    id: 6,
    titulo: 'Segurança na Nuvem: Mitos e Verdades',
    resumo: 'A migração para a nuvem é segura? Desmistificamos os principais mitos e mostramos como proteger seus dados em ambientes cloud.',
    data: '2025-12-15',
    imagem: 'blog6.jpg',
    textoAlternativo: 'Nuvem Segura',
  },
];

export const secoesBlog = [
  {
    titulo: 'Newsletter Mensal',
    texto: 'Assine nossa newsletter e receba um resumo curado com as principais ameaças do mês, novidades do setor e dicas exclusivas da ShieldPME diretamente no seu email. Nosso conteúdo é desenvolvido por especialistas e não contém spam — apenas informação relevante e acionável para manter sua empresa protegida.',
    itens: [
      'Resumo mensal das principais ameaças cibernéticas globais',
      'Dicas práticas de segurança para equipes de TI',
      'Atualizações sobre regulamentações e conformidade',
      'Convites para webinars e eventos exclusivos',
    ],
  },
  {
    titulo: 'Conteúdo para Empresas',
    texto: 'Desenvolvemos materiais exclusivos para gestores, equipes de TI e profissionais de segurança que desejam fortalecer a cultura de proteção digital dentro de suas organizações. Nossos whitepapers, e-books e guias práticos abordam desde conceitos básicos até estratégias avançadas de defesa cibernética.',
    itens: [
      'Whitepapers sobre arquitetura de segurança em camadas',
      'Guias de conformidade com LGPD, ISO 27001 e SOC 2',
      'Checklists de auditoria interna de segurança',
      'Treinamentos corporativos em conscientização cibernética',
    ],
  },
];

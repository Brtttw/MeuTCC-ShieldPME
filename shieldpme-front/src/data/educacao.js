// Conteúdo da área "Educação em Cibersegurança".
// Blocos: h2 (subtítulo), p (parágrafo), ul (lista), aviso (destaque).

export const paginaEducacao = {
  titulo: 'Educação em Cibersegurança',
  introducao:
    'Segurança digital não é assunto só de especialistas. Estes guias curtos explicam, em linguagem simples, ' +
    'o que você precisa saber para proteger seus dados, sua empresa e seus clientes. O acesso é livre: não é ' +
    'preciso contratar nenhum serviço.',
};

export const artigos = [
  {
    slug: 'fundamentos-da-ciberseguranca',
    titulo: 'Fundamentos da cibersegurança',
    resumo: 'O que é cibersegurança, o que significa a tríade CIA e por que ela importa para pequenas empresas.',
    leitura: '6 min de leitura',
    conteudo: [
      { t: 'h2', x: 'O que é cibersegurança?' },
      { t: 'p', x: 'Cibersegurança é o conjunto de práticas, ferramentas e hábitos usados para proteger computadores, celulares, redes, sistemas e, principalmente, as informações que eles guardam. O objetivo é evitar que dados sejam roubados, alterados, apagados ou que um serviço fique fora do ar por causa de um ataque ou de um erro.' },
      { t: 'p', x: 'Ela não é só tecnologia. Pessoas, processos e ferramentas trabalham juntos: de nada adianta um bom antivírus se alguém compartilha a senha por mensagem.' },

      { t: 'h2', x: 'Os três pilares: confidencialidade, integridade e disponibilidade' },
      { t: 'p', x: 'Os profissionais de segurança costumam avaliar qualquer situação por três perguntas, conhecidas como tríade CIA (do inglês Confidentiality, Integrity, Availability):' },
      { t: 'ul', x: [
        'Confidencialidade: só quem tem permissão consegue ver a informação. Exemplo: a folha de pagamento visível apenas ao financeiro. Violação: um funcionário desligado ainda acessa o sistema.',
        'Integridade: a informação é correta e não foi alterada sem autorização. Exemplo: o valor de um boleto não pode ser trocado no caminho. Violação: um invasor muda os dados bancários de um fornecedor.',
        'Disponibilidade: o sistema e os dados estão acessíveis quando precisam ser usados. Exemplo: a loja virtual funcionando na Black Friday. Violação: um ransomware que bloqueia os arquivos da empresa.',
      ] },
      { t: 'aviso', x: 'Ao avaliar um risco, pergunte: isso pode expor o dado (confidencialidade), alterá-lo (integridade) ou impedir o acesso a ele (disponibilidade)?' },

      { t: 'h2', x: 'Por que pessoas e pequenas empresas precisam se preocupar?' },
      { t: 'p', x: 'É comum pensar que “ninguém vai atacar uma empresa pequena”. Na prática, criminosos raramente escolhem alvos um a um: usam ferramentas automáticas que procuram qualquer sistema vulnerável. Pequenas empresas são atrativas porque costumam ter menos proteção, e ainda guardam dados valiosos, como cadastros de clientes, contas bancárias e acesso a fornecedores maiores.' },
      { t: 'ul', x: [
        'Um incidente pode parar a operação por dias e gerar prejuízo financeiro direto.',
        'Vazamento de dados de clientes pode trazer sanções previstas na LGPD (Lei Geral de Proteção de Dados) e abalar a confiança no negócio.',
        'Sua empresa pode ser usada como porta de entrada para atacar parceiros e clientes.',
      ] },

      { t: 'h2', x: 'Exemplos do dia a dia' },
      { t: 'ul', x: [
        'Phishing: uma mensagem falsa de “banco” ou “transportadora” que leva a um site clonado para roubar senhas.',
        'Ransomware: um anexo infectado criptografa os arquivos da empresa e os criminosos pedem resgate.',
        'Reutilização de senhas: uma senha vazada em um site é testada em e-mail, redes sociais e banco.',
        'Wi-Fi público: redes abertas em cafés e aeroportos podem ser monitoradas ou imitadas por golpistas.',
        'Software desatualizado: falhas conhecidas e já corrigidas continuam abertas porque a atualização foi adiada.',
        'Dispositivo perdido: um notebook ou celular sem senha e sem criptografia expõe tudo o que está nele.',
      ] },

      { t: 'h2', x: 'Primeiros passos práticos' },
      { t: 'ul', x: [
        'Mantenha sistemas, aplicativos e navegadores sempre atualizados.',
        'Use senhas fortes e únicas, com autenticação em duas etapas.',
        'Faça cópias de segurança (backups) regulares e teste se conseguem ser restauradas.',
        'Dê a cada pessoa apenas os acessos de que ela precisa e remova acessos de quem saiu.',
        'Treine a equipe: a maioria dos incidentes começa com um clique descuidado.',
      ] },
      { t: 'p', x: 'Segurança é um processo contínuo, não um produto que se compra uma vez. Pequenas melhorias constantes reduzem bastante o risco.' },
    ],
  },
  {
    slug: 'senhas-autenticacao-e-phishing',
    titulo: 'Senhas, autenticação e phishing',
    resumo: 'Como criar senhas fortes, por que usar autenticação multifator e como reconhecer golpes.',
    leitura: '7 min de leitura',
    conteudo: [
      { t: 'h2', x: 'Como criar senhas fortes' },
      { t: 'p', x: 'Uma boa senha é longa, difícil de adivinhar e única para cada serviço. O tamanho importa mais do que a complexidade: uma frase longa é mais segura e mais fácil de lembrar do que uma sequência curta cheia de símbolos.' },
      { t: 'ul', x: [
        'Use pelo menos 12 caracteres; prefira frases com palavras sem relação entre si.',
        'Nunca reutilize a mesma senha em serviços diferentes.',
        'Evite dados pessoais: nome, data de nascimento, time de futebol, nome de pet.',
        'Evite sequências comuns como “123456”, “qwerty” ou “senha123”.',
        'Troque a senha imediatamente se houver suspeita de vazamento.',
      ] },

      { t: 'h2', x: 'Como guardar senhas com segurança' },
      { t: 'p', x: 'Ninguém consegue memorizar dezenas de senhas longas e diferentes. Por isso, o caminho recomendado é usar um gerenciador de senhas: um aplicativo que cria, guarda e preenche as senhas para você, protegido por uma única senha mestra forte.' },
      { t: 'ul', x: [
        'Ele gera senhas aleatórias que ninguém adivinha.',
        'Preenche apenas no site correto, o que ajuda a perceber páginas falsas.',
        'Evita papéis colados no monitor, planilhas abertas e senhas enviadas por mensagem.',
      ] },
      { t: 'aviso', x: 'Proteja o gerenciador com uma senha mestra longa e ative a autenticação em duas etapas nele também.' },

      { t: 'h2', x: 'Autenticação multifator (MFA)' },
      { t: 'p', x: 'A autenticação multifator exige uma segunda prova de identidade além da senha. Assim, mesmo que a senha seja roubada, o invasor não consegue entrar sozinho. As provas costumam ser algo que você sabe (senha), algo que você tem (celular, chave de segurança) ou algo que você é (digital, rosto).' },
      { t: 'ul', x: [
        'Melhores opções: aplicativo autenticador ou chave de segurança física.',
        'Aceitáveis: código por SMS, que é melhor que nada, mas mais fácil de interceptar.',
        'Ative primeiro em e-mail, banco, redes sociais e sistemas da empresa.',
        'Nunca informe códigos a ninguém, nem a quem diga ser do suporte.',
      ] },

      { t: 'h2', x: 'O que é phishing e como reconhecer' },
      { t: 'p', x: 'Phishing é a tentativa de enganar alguém, por e-mail, SMS, WhatsApp, ligação ou site falso, para que entregue senhas, dados de cartão ou instale um programa malicioso. O golpe costuma explorar medo, urgência ou ganância.' },
      { t: 'ul', x: [
        'Urgência ou ameaça: “sua conta será bloqueada em 24 horas”.',
        'Promessas boas demais: prêmios, descontos enormes, restituição inesperada.',
        'Remetente estranho: o nome parece certo, mas o endereço de e-mail tem erros ou domínio diferente.',
        'Links suspeitos: passe o mouse (ou segure o dedo) sobre o link e confira o endereço real antes de clicar.',
        'Pedido de dados sensíveis: empresas sérias não pedem senha ou código por mensagem.',
        'Anexos inesperados, principalmente arquivos compactados ou que pedem para “habilitar macros”.',
        'Erros de português, logotipos borrados ou páginas com visual levemente diferente do original.',
      ] },

      { t: 'h2', x: 'O que fazer ao suspeitar de um golpe' },
      { t: 'ul', x: [
        'Não clique, não responda e não abra anexos.',
        'Se já clicou, mas não digitou nada, feche a página e execute uma verificação com o antivírus.',
        'Se informou uma senha, troque-a imediatamente, em todos os serviços onde ela foi usada, e ative o MFA.',
        'Se passou dados bancários, ligue para o banco pelo telefone oficial e peça o bloqueio.',
        'Avise o responsável de TI ou a chefia, para que outras pessoas sejam alertadas.',
        'Confirme a mensagem por outro canal, ligando para o número que você já conhece.',
        'Denuncie: marque como phishing no e-mail e, se houve prejuízo, registre um boletim de ocorrência.',
      ] },
      { t: 'p', x: 'Desconfiar não é exagero: parar por um minuto antes de clicar é uma das defesas mais eficazes que existem.' },
    ],
  },
  {
    slug: 'seguranca-de-sites-e-aplicacoes-web',
    titulo: 'Segurança básica de sites e aplicações web',
    resumo: 'Vulnerabilidades comuns, boas práticas e o papel do OWASP ZAP e dos scanners automatizados.',
    leitura: '8 min de leitura',
    conteudo: [
      { t: 'h2', x: 'O que são vulnerabilidades em aplicações web?' },
      { t: 'p', x: 'Uma vulnerabilidade é uma falha de programação, de configuração ou de projeto que um atacante pode explorar para fazer algo que não deveria: ler dados de outras pessoas, alterar informações ou derrubar o site. Sites e sistemas web ficam expostos na internet 24 horas por dia, por isso são alvos frequentes.' },
      { t: 'p', x: 'Uma referência muito usada no mercado é o OWASP Top 10, uma lista mantida pela comunidade OWASP com as categorias de risco mais comuns em aplicações web.' },

      { t: 'h2', x: 'Exemplos de riscos comuns' },
      { t: 'ul', x: [
        'Injeção de SQL: o site monta consultas ao banco de dados usando texto digitado pelo usuário sem tratá-lo. Um atacante digita comandos no lugar de um dado normal e consegue ler ou apagar informações.',
        'XSS (Cross-Site Scripting): o site exibe conteúdo enviado por usuários sem filtrar, e um código malicioso passa a ser executado no navegador das vítimas, podendo roubar sessões ou redirecionar para páginas falsas.',
        'Configurações incorretas: painéis administrativos abertos, senhas padrão, listagem de pastas, mensagens de erro que mostram detalhes internos ou arquivos de backup esquecidos no servidor.',
        'Controle de acesso falho: um usuário consegue ver dados de outro apenas trocando um número na URL.',
        'Componentes desatualizados: bibliotecas e plugins com falhas já conhecidas e publicadas.',
      ] },

      { t: 'h2', x: 'Boas práticas essenciais' },
      { t: 'ul', x: [
        'Atualize dependências: frameworks, bibliotecas, plugins e o sistema do servidor. Falhas conhecidas são as mais exploradas.',
        'Valide e trate todas as entradas: nunca confie no que vem do navegador. Valide tipo, tamanho e formato no servidor e use consultas parametrizadas no banco de dados.',
        'Escape o conteúdo exibido: dados de usuários devem ser tratados antes de aparecer em uma página, para evitar XSS.',
        'Use HTTPS em todo o site: ele criptografa a comunicação e protege senhas e dados de interceptação. Mantenha o certificado válido e redirecione o tráfego HTTP para HTTPS.',
        'Aplique o princípio do menor privilégio: contas, serviços e usuários do banco só com as permissões necessárias.',
        'Configure cabeçalhos de segurança e desative o que não é usado: recursos, portas e painéis desnecessários.',
        'Não exponha erros detalhados ao público e guarde registros (logs) para investigar incidentes.',
        'Faça backups e teste a restauração.',
      ] },

      { t: 'h2', x: 'O que é o OWASP ZAP?' },
      { t: 'p', x: 'O OWASP ZAP (Zed Attack Proxy) é uma ferramenta gratuita e de código aberto, mantida pela comunidade OWASP, usada para testar a segurança de aplicações web. Ele funciona como um intermediário entre o navegador e o site e também pode navegar e testar a aplicação de forma automática.' },
      { t: 'ul', x: [
        'Mapeia as páginas e os formulários do site.',
        'Faz varreduras passivas (apenas observa o tráfego) e ativas (envia requisições de teste).',
        'Aponta possíveis problemas, como cabeçalhos ausentes, cookies inseguros, indícios de XSS e de injeção.',
        'Classifica os achados por nível de risco e ajuda a priorizar as correções.',
      ] },
      { t: 'aviso', x: 'Teste apenas sites que sejam seus ou para os quais você tenha autorização por escrito. Varrer sistemas de terceiros sem permissão pode ser crime.' },

      { t: 'h2', x: 'Varredura automatizada não é auditoria completa' },
      { t: 'p', x: 'Um scanner é ótimo para encontrar problemas comuns de forma rápida e repetível, mas tem limites importantes:' },
      { t: 'ul', x: [
        'Pode deixar passar falhas, principalmente as de lógica de negócio e de controle de acesso, que exigem entender como o sistema deve funcionar.',
        'Pode apontar falsos positivos, ou seja, alertas que na verdade não são um problema real.',
        'Não avalia sozinho processos, pessoas, infraestrutura, código-fonte e políticas internas.',
        'Retrata o site naquele momento: uma nova versão pode introduzir novas falhas.',
      ] },
      { t: 'p', x: 'Uma auditoria completa combina ferramentas automáticas com análise manual feita por especialistas, revisão de código e de configurações, e avaliação do contexto do negócio.' },
      { t: 'aviso', x: 'Um relatório sem alertas graves não garante que o site esteja totalmente seguro. Ele indica que aquele conjunto de testes não encontrou problemas, e a segurança deve ser reavaliada com regularidade.' },
    ],
  },
];

export const buscarArtigo = (slug) => artigos.find((a) => a.slug === slug);

# ShieldPME (React)

Versão em React do site ShieldPME: mesmo visual, textos e comportamento do HTML original, organizados em componentes.

## Como rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a pasta dist/
```

Requer Node 18 ou superior.

## Estrutura

```
public/imagens/        imagens do site (nomes sem acento e sem espaço)
src/
  main.jsx             entrada da aplicação
  App.jsx              rotas, tela de carregamento, navbar, rodapé e cookies
  pages/               uma tela por rota (Home, Login, Register, Checkout...)
  components/
    layout/            Navbar, Footer, LoadingScreen, CookieBanner
    home/              seções da home (Hero, About, Services, Pricing, PlanCard)
    forms/             GoogleLoginButton
    shared/            PaginaInterna, ContentSection
  data/                textos e listas do site (planos, serviços, blog...)
  services/            chamadas à API; cada arquivo também sabe responder com os dados de data/
  hooks/  utils/       useAsync, tela de carregamento, formatadores, JWT
  config/env.js        variáveis de ambiente
  styles/              um arquivo CSS por área (importados em index.css)
docs/                  INTEGRACAO.md, schema.sql, seed.sql
```

## Rotas

| Rota | Tela |
|---|---|
| `/` | Início, Sobre, Serviços e Planos (a navbar usa `/#about`, `/#services`, `/#pricing`) |
| `/login`, `/cadastro` | Entrar e criar conta |
| `/checkout/:plano` | `plus`, `pro` ou `ultra` |
| `/contato`, `/minha-conta`, `/blog`, `/ferramentas` | Páginas do rodapé |
| `/privacidade`, `/termos` | Páginas legais |

## Onde alterar

- **Textos, preços e listas:** `src/data/*.js` (planos em `planos.js`, serviços em `servicos.js`, etc.).
- **Textos fixos dentro de componentes:** `Hero.jsx`, `Services.jsx` (parágrafo ao lado dos cards) e `Footer.jsx`.
- **Visual:** o arquivo de `src/styles/` com o nome da área (`pricing.css`, `navbar.css`, `checkout.css`...).
- **Palavras que alternam na home:** lista `PALAVRAS` em `PalavraRotativa.jsx`.

## Backend

Por padrão (`VITE_USE_MOCK=true`) o site usa os dados de `src/data` e funciona sem servidor. Com `VITE_USE_MOCK=false`,
os arquivos de `src/services` chamam a API do Spring Boot. Contrato dos endpoints, scripts do SQL Server e configuração
do Spring estão em [`docs/INTEGRACAO.md`](docs/INTEGRACAO.md).

## Diferenças em relação ao HTML original

O comportamento foi mantido, com estas exceções e observações:

- **Rolagem corrigida:** no original, Contato, Minha Conta, Blog, Ferramentas e Checkout não rolavam (a tela era `position: fixed`
  só com `min-height`), então o botão "Confirmar Pagamento" ficava inacessível em telas baixas. Agora usam `height: 100vh`
  como Privacidade e Termos (`pages.css` e `checkout.css`). Para voltar ao original, troque `height` por `min-height`.
- **Script quebrado no original:** um `const mainSections` declarado duas vezes impedia a execução de todo aquele bloco, então o
  destaque do link ativo da navbar e o "arrastar para mudar de seção" nunca funcionaram. Não foram recriados; o estilo
  `nav a.active` continua em `navbar.css`.
- **Imagens do blog:** `blog1.jpg` a `blog6.jpg` não estavam no zip. Coloque-as em `public/imagens/`.
- **Texto:** "cibernéticose" (falta um espaço) em `Services.jsx` está igual ao original.
- **Pagamento:** "Confirmar Pagamento" só exibe o aviso de aprovação em modo mock; nenhuma cobrança é feita.

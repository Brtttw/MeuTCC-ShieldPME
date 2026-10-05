# Integração com Spring Boot + SQL Server

O front chama a API somente pelos arquivos de `src/services`. Para ligar o backend:

1. Em `.env`, troque `VITE_USE_MOCK=true` por `VITE_USE_MOCK=false`.
2. Implemente os endpoints abaixo (os nomes dos campos JSON são exatamente os que o front lê).
3. Banco: execute `docs/schema.sql` e depois `docs/seed.sql` (já traz planos, serviços, blog e ferramentas do site).

Em desenvolvimento, o Vite encaminha `/api` para `http://localhost:8080` (`vite.config.js`), então não há CORS.

## Endpoints

Erros devem responder 4xx/5xx com `{ "mensagem": "texto exibido ao usuário" }`.
Requisições autenticadas enviam `Authorization: Bearer <jwt>` (o token é salvo após login).

| Método | Rota | Corpo da requisição | Resposta |
|---|---|---|---|
| GET | `/api/planos` | – | `[Plano]` |
| GET | `/api/planos/{codigo}` | – | `Plano` (404 se não existir) |
| GET | `/api/servicos` | – | `[Servico]` |
| GET | `/api/blog/posts` | – | `[Post]` |
| GET | `/api/ferramentas` | – | `[Ferramenta]` |
| POST | `/api/auth/login` | `{ email, senha }` | `{ token, usuario: { nome, email, foto } }` |
| POST | `/api/auth/cadastro` | `{ nome, email, senha }` | 201 |
| POST | `/api/auth/google` | `{ credential }` (ID token do Google) | `{ token, usuario }` |
| POST | `/api/contatos` | `{ nome, email, assunto, mensagem }` | 204 |
| POST | `/api/newsletter` | `{ email, dataNascimento }` (`yyyy-MM-dd` ou null) | 204 |
| POST | `/api/pagamentos/pix` | `{ planoCodigo }` | `{ copiaECola, qrCodeData }` |
| POST | `/api/assinaturas` | ver abaixo | 201 |

### Formatos

```jsonc
// Plano (tabelas Plano + PlanoBeneficio)
{ "id": 2, "codigo": "pro", "nome": "PRO", "descricao": "...",
  "precoMensal": 161, "precoAnual": 1932, "destaque": true,
  "beneficios": ["Monitoramento 24/7", "Firewall avançado"] }

// Servico (tabela Servico). "icone" é o nome do arquivo em /imagens
{ "id": 1, "titulo": "Monitoramento", "descricao": "...", "icone": "monitoramento.png", "textoAlternativo": "..." }

// Post (tabela Postagem). "data" = PublicadoEm no formato yyyy-MM-dd; "imagem" = nome do arquivo
{ "id": 1, "titulo": "...", "resumo": "...", "data": "2026-01-15", "imagem": "blog1.jpg", "textoAlternativo": "..." }

// Ferramenta (tabelas Ferramenta + FerramentaRecurso)
{ "id": 1, "nome": "Wireshark", "descricao": "...", "recursos": ["...", "..."] }

// POST /api/assinaturas
{ "planoCodigo": "pro",
  "cliente":   { "nome": "", "email": "", "telefone": "", "cpf": "", "empresa": "" },
  "pagamento": { "metodo": "credito",          // credito | debito | pix | boleto
                 "parcelas": 3,
                 "dados": { "cartaoNumero": "", "cartaoNome": "", "cartaoValidade": "", "cartaoCvv": "" } } }
```

Os campos de `pagamento.dados` dependem do método: `credito` (`cartao*`), `debito` (`debito*` com banco, agência e conta),
`boleto` (`boletoCpf`, `boletoEndereco`, `boletoCep`, `boletoCidade`) e `pix` (vazio).

## Pontos de atenção

- **Cartão:** não grave número completo nem CVV no SQL Server. Repasse os dados ao gateway (Mercado Pago, Pagar.me, Stripe...)
  e guarde só o ID da transação e os 4 últimos dígitos (colunas `GatewayTransacaoId` e `CartaoUltimos4`). O ideal é o front
  tokenizar o cartão com o SDK do gateway e enviar o token no lugar dos campos `cartao*`.
- **Valores:** o backend deve recalcular o preço pelo `planoCodigo`; nunca confie em valores vindos do front.
- **Senha:** gravar com BCrypt em `Usuario.SenhaHash`.
- **Google:** validar o `credential` no backend (`GoogleIdTokenVerifier`) com o mesmo Client ID de `.env`.
- **PIX:** hoje (modo mock) a chave é fixa. Em produção, gerar uma cobrança por assinatura e devolver `copiaECola`.

## Spring Boot

`application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=ShieldPME;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=...
spring.jpa.hibernate.ddl-auto=validate
# As tabelas e colunas do schema.sql estão em PascalCase: não converter para snake_case
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```

Dependência do driver: `com.microsoft.sqlserver:mssql-jdbc`.

Para o Spring servir o front, gere o build (`npm run build`), copie o conteúdo de `dist/` para `src/main/resources/static/`
e encaminhe as rotas do React Router para o `index.html`:

```java
@Controller
class SpaController {
    @GetMapping({"/", "/login", "/cadastro", "/privacidade", "/termos", "/contato",
                 "/minha-conta", "/blog", "/ferramentas", "/checkout/{plano}"})
    String index() { return "forward:/index.html"; }
}
```

Se o front for hospedado separado do Spring, defina `VITE_API_URL` com a URL completa da API e habilite CORS no backend.

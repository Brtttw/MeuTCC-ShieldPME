# ShieldPME — backend + frontend

Plataforma de serviços de cibersegurança para PMEs. Fluxo implementado: cadastro de clientes → solicitação de
serviços → notificação aos funcionários → atendimento → envio de relatório PDF → consulta pelo cliente.

## Como o fluxo usa o modelo existente
- Cliente = `users` (papel CLIENT) + `companies`. Funcionário = `employees` + `users` (papel EMPLOYEE) com o **mesmo e-mail**.
- Solicitação = `contracts` (PENDING) + `contract_services` (serviço/site/frequência) + `service_executions` (uma por repetição).
- "Assumir atendimento" = `execution_assignments`. Relatório = `reports` (1 por execução); arquivo em disco privado.
- Única tabela nova: `notifications` (`shieldpme-api/database/scripts/002_notifications.sql`).

## Configuração do backend (Java 21, SQL Server)
1. Rode `database/shieldpme_database.sql` (criação + seeds) e depois `database/scripts/002_notifications.sql`.
2. **Segurança do seed:** o seed cria `owner@shieldpme.com` (ADMIN) com um hash BCrypt fixo e público no repositório.
   Remova ou troque antes de qualquer uso real: `DELETE FROM dbo.users WHERE email='owner@shieldpme.com';`
3. Variáveis de ambiente (veja `shieldpme-api/.env.example`): `DB_PASSWORD`, `JWT_SECRET` (≥32 caracteres), opcionais
   `DB_URL`, `DB_USERNAME`, `CORS_ALLOWED_ORIGINS`, `REPORTS_DIR`.
4. `cd shieldpme-api && ./mvnw spring-boot:run` (API em http://localhost:8080).

## Criar o primeiro funcionário (único meio; não há cadastro público de funcionários)
```bash
cd shieldpme-api
export DB_PASSWORD=... JWT_SECRET=...            # as mesmas variáveis da API
export EMPLOYEE_PASSWORD='SenhaForte123'         # ou omita e digite quando solicitado (terminal interativo)
./mvnw spring-boot:run -Dspring-boot.run.arguments='--server.port=0 --create-employee --name="Maria Silva" --email=maria@shieldpme.com'
# ou, com o jar:  java -jar target/shieldpme-api-0.0.1-SNAPSHOT.jar --server.port=0 --create-employee --name="Maria Silva" --email=maria@shieldpme.com
```
Valida os dados, recusa e-mail duplicado, grava a senha em BCrypt e encerra o processo (código 0 = sucesso).

## Frontend
```bash
cd shieldpme-front && npm install && npm run dev      # http://localhost:5173 (proxy /api -> :8080)
```
As áreas de login/cadastro/cliente/funcionário sempre usam a API real. `VITE_USE_MOCK=true` continua valendo apenas
para o conteúdo institucional (planos, blog etc.), que não faz parte deste escopo.

## Endpoints principais
Públicos: `POST /api/auth/register` (só CLIENT), `POST /api/auth/login`. CLIENT: `/api/client/requests`, `/api/client/reports`.
EMPLOYEE: `/api/staff/requests`, `/api/staff/executions/{id}/claim|report`, `/api/staff/notifications`. `/api/catalog`: CLIENT/EMPLOYEE.
Os CRUDs legados (`/api/users`, `/api/reports`...) agora exigem papel ADMIN.

## Testes
- `./mvnw test -Dtest='CnpjValidatorTest,PdfSignatureCheckTest'` (unitários, sem banco).
- `ShieldpmeApiApplicationTests` (contextLoads) exige SQL Server e `JWT_SECRET`/`DB_PASSWORD`.
- Roteiro manual ponta a ponta: cadastre cliente na UI → login → solicite → crie funcionário (comando acima) → login como
  funcionário → clique na notificação → assuma a execução → envie um PDF → entre como cliente e baixe → tente abrir
  `/api/client/requests/{id}` e `/api/client/reports/{id}/file` com outro cliente (deve dar 404).

## Limitações conhecidas
- Sem prova de propriedade do site informado; sem limite de tentativas de login; token JWT guardado em `localStorage`.
- Qualquer funcionário ativo vê todas as solicitações e pode assumir qualquer execução.
- Login com Google não implementado (o botão informa indisponibilidade). `service_controller.zip` em `src/main/java` é resíduo.

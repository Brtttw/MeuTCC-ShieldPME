# DTOs, exceções e configuração inicial — ShieldPME

Este pacote é um overlay para `src/main/java/br/com/shieldpme/api/`. Extraia na raiz do projeto, mantendo os caminhos.

Inclui DTOs com validação Jakarta, respostas seguras para usuário/empresa/site, `DtoMapper`, exceções de domínio, `GlobalExceptionHandler` e um bean `PasswordEncoder` BCrypt.

**Importante:** os controllers existentes continuam recebendo/devolvendo entidades até serem migrados para os DTOs. Os DTOs não ficam ativos só por existirem. O `DtoMapper` está pronto para essa migração. Não exponha `User` diretamente em respostas HTTP: `User` contém `passwordHash`.

**Senha:** o bean BCrypt não codifica automaticamente nada. O serviço de cadastro/autenticação precisa chamar `passwordEncoder.encode(senha)` antes de persistir e usar `passwordEncoder.matches(...)` no login. Não habilite cadastro público antes dessa mudança.

**Exceções:** o handler captura as exceções de domínio listadas e erros comuns de validação/JSON/banco. Os serviços atuais lançam `IllegalArgumentException` em vários casos, tratados como HTTP 400. Para HTTP 404/409/422 mais semânticos, migre gradualmente para as exceções de domínio.

A configuração de filtro/autorização do Spring Security não é substituída aqui: é melhor configurá-la junto do fluxo de autenticação do que adicionar um `permitAll` que deixaria a API desprotegida.

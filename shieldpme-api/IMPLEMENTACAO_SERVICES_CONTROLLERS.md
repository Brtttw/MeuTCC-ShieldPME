# ShieldPME — primeira implementação de services e controllers

## O que foi adicionado
- Controllers REST para usuários, empresas, sites, contratos, serviços contratados, funcionários, atribuições, permissões, relatórios, seções de relatório, perfis, execuções, frequências, ofertas e configurações.
- Services com operações básicas de consulta, criação, atualização e exclusão.
- Services específicos para usuário, empresa e site com verificações de unicidade/referências básicas.
- `AbstractCrudService` para reduzir repetição nos CRUDs simples.
- Repositório `RolePermissionRepository` corrigido para usar a chave composta `RolePermissionId`.
- Consultas derivadas inválidas/inconsistentes removidas ou corrigidas (`UserRepository.findByCompanyId`, `findByFrequencyId`).

## Endpoints
Todos os endpoints ficam sob `/api`. Exemplos:
- `GET /api/sites`
- `GET /api/sites/{id}`
- `GET /api/sites/by-company/{companyId}`
- `POST /api/sites?companyId=1`
- `PUT /api/sites/{id}`
- `DELETE /api/sites/{id}`

Os demais recursos seguem o caminho definido no `@RequestMapping` de cada controller.

## Importante: estado desta versão
1. **Ainda não é uma versão pronta para produção.** Os controllers recebem/devolvem entidades JPA diretamente; a próxima etapa é criar DTOs e mapear as respostas para não expor campos internos, especialmente `User.passwordHash`.
2. A configuração final de Spring Security/autorização por perfil e permissão ainda não está incluída nesta etapa. Não exponha a API publicamente.
3. `AuthenticationService` e `ZapScanService` são placeholders intencionais: login/registro e a integração real com OWASP ZAP ficam para a etapa de segurança e para a implementação guiada do scan.
4. O CRUD genérico atualiza entidades substituindo o objeto recebido e definindo o ID da rota. Para entidades com relações, envie os IDs das relações no JSON e teste cada operação; regras de negócio mais complexas devem ser movidas para serviços específicos.
5. A compilação automática não foi executada neste ambiente porque o ZIP não contém `.mvn/wrapper/maven-wrapper.properties` e não há Maven instalado aqui. Execute localmente `./mvnw clean test` depois de aplicar as alterações. Se o wrapper também estiver incompleto na sua máquina, rode `mvn clean test` com Maven instalado.

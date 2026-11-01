package br.com.shieldpme.api.cli;

import java.io.Console;
import java.util.Locale;
import java.util.regex.Pattern;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.entity.Role;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.EmployeeRepository;
import br.com.shieldpme.api.repository.RoleRepository;
import br.com.shieldpme.api.repository.UserRepository;
import br.com.shieldpme.api.service.AuthenticationService;

/**
 * Comando administrativo para criar FUNCIONARIOS (nao existe endpoint publico para isso).
 *
 * Uso (a senha NUNCA vai na linha de comando):
 *   export EMPLOYEE_PASSWORD='...'          # ou digite quando o programa pedir (precisa de terminal interativo)
 *   java -jar shieldpme-api.jar --server.port=0 \
 *        --create-employee --name="Maria Silva" --email=maria@shieldpme.com [--phone="+55 11 99999-0000"]
 *
 * Cria o registro em employees e o usuario de login (papel EMPLOYEE) com o MESMO e-mail, senha em BCrypt.
 * Sem a opcao --create-employee este componente nao faz nada.
 */
@Component
public class EmployeeAdminRunner implements ApplicationRunner {

    private static final Pattern EMAIL = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");

    private final ConfigurableApplicationContext context;
    private final EmployeeRepository employees;
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;
    private final TransactionTemplate tx;

    public EmployeeAdminRunner(ConfigurableApplicationContext context, EmployeeRepository employees,
                               UserRepository users, RoleRepository roles, PasswordEncoder encoder,
                               TransactionTemplate tx) {
        this.context = context;
        this.employees = employees;
        this.users = users;
        this.roles = roles;
        this.encoder = encoder;
        this.tx = tx;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!args.containsOption("create-employee")) return;

        int exitCode = 0;
        try {
            String name = single(args, "name");
            String email = AuthenticationService.normalizeEmail(single(args, "email"));
            String phone = args.containsOption("phone") ? single(args, "phone") : null;
            String password = readPassword();

            if (name == null || name.isBlank() || name.length() > 150) fail("--name é obrigatório (até 150 caracteres).");
            if (!EMAIL.matcher(email).matches() || email.length() > 100) fail("--email inválido.");
            AuthenticationService.validatePassword(password);

            tx.executeWithoutResult(status -> {
                if (employees.findByEmail(email).isPresent() || users.existsByEmail(email))
                    throw new IllegalArgumentException("Já existe funcionário ou usuário com este e-mail.");
                Role role = roles.findByName(AuthenticationService.ROLE_EMPLOYEE)
                        .orElseThrow(() -> new IllegalStateException("Papel EMPLOYEE não existe (rode o seed)."));

                Employee employee = new Employee();
                employee.setName(name.trim());
                employee.setEmail(email);
                employee.setPhone(phone == null || phone.isBlank() ? null : phone.trim());
                employee.setActive(true);
                employees.save(employee);

                User user = new User();
                user.setEmail(email);
                user.setPhone(employee.getPhone());
                user.setPasswordHash(encoder.encode(password));
                user.setRole(role);
                users.save(user);
            });
            System.out.println("Funcionário criado com sucesso: " + email);
        } catch (RuntimeException e) {
            System.err.println("ERRO: " + e.getMessage());
            exitCode = 1;
        }
        final int code = exitCode;
        System.exit(SpringApplication.exit(context, () -> code));
    }

    private static String single(ApplicationArguments args, String option) {
        var values = args.getOptionValues(option);
        return values == null || values.isEmpty() ? null : values.get(0);
    }

    private static void fail(String message) { throw new IllegalArgumentException(message); }

    private static String readPassword() {
        String fromEnv = System.getenv("EMPLOYEE_PASSWORD");
        if (fromEnv != null && !fromEnv.isEmpty()) return fromEnv;
        Console console = System.console();
        if (console == null)
            throw new IllegalArgumentException("Defina a variável de ambiente EMPLOYEE_PASSWORD ou use um terminal interativo.");
        char[] first = console.readPassword("Senha do funcionário: ");
        char[] second = console.readPassword("Confirme a senha: ");
        if (first == null || second == null || !new String(first).equals(new String(second)))
            throw new IllegalArgumentException("As senhas não conferem.");
        return new String(first);
    }
}

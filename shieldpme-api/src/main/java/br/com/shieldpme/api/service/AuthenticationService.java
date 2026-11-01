package br.com.shieldpme.api.service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.shieldpme.api.dto.AuthDtos.LoginResponse;
import br.com.shieldpme.api.dto.AuthDtos.RegisterClientRequest;
import br.com.shieldpme.api.dto.AuthDtos.SessionUser;
import br.com.shieldpme.api.dto.LoginRequest;
import br.com.shieldpme.api.entity.Company;
import br.com.shieldpme.api.entity.Employee;
import br.com.shieldpme.api.entity.Role;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.exception.AuthenticationFailedException;
import br.com.shieldpme.api.exception.BusinessRuleException;
import br.com.shieldpme.api.exception.ResourceConflictException;
import br.com.shieldpme.api.repository.CompanyRepository;
import br.com.shieldpme.api.repository.EmployeeRepository;
import br.com.shieldpme.api.repository.RoleRepository;
import br.com.shieldpme.api.repository.UserRepository;
import br.com.shieldpme.api.security.JwtService;
import br.com.shieldpme.api.util.CnpjValidator;

@Service
public class AuthenticationService {

    public static final String ROLE_CLIENT = "CLIENT";
    public static final String ROLE_EMPLOYEE = "EMPLOYEE";

    private static final String INVALID_CREDENTIALS = "E-mail ou senha inválidos.";

    private final UserRepository users;
    private final RoleRepository roles;
    private final CompanyRepository companies;
    private final EmployeeRepository employees;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    /** Hash descartavel para igualar o tempo de resposta quando o e-mail nao existe. */
    private final String dummyHash;

    public AuthenticationService(UserRepository users, RoleRepository roles, CompanyRepository companies,
                                 EmployeeRepository employees, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.roles = roles;
        this.companies = companies;
        this.employees = employees;
        this.encoder = encoder;
        this.jwt = jwt;
        this.dummyHash = encoder.encode("senha-descartavel-" + System.nanoTime());
    }

    public static String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }

    /** Valida regras de senha comuns ao cadastro e ao comando administrativo. */
    public static void validatePassword(String password) {
        if (password == null || password.length() < 8)
            throw new BusinessRuleException("A senha deve ter pelo menos 8 caracteres.");
        if (password.getBytes(StandardCharsets.UTF_8).length > 72)
            throw new BusinessRuleException("A senha excede o tamanho máximo suportado (72 bytes).");
        if (password.chars().noneMatch(Character::isLetter) || password.chars().noneMatch(Character::isDigit))
            throw new BusinessRuleException("A senha deve conter letras e números.");
    }

    /** Cadastro publico: cria usuario com papel CLIENT (fixo) e a empresa dele, na mesma transacao. */
    @Transactional
    public void registerClient(RegisterClientRequest req) {
        String email = normalizeEmail(req.email());
        String cnpj = CnpjValidator.digitsOnly(req.cnpj());
        if (!CnpjValidator.isValid(cnpj)) throw new BusinessRuleException("CNPJ inválido.");
        validatePassword(req.password());
        if (users.existsByEmail(email)) throw new ResourceConflictException("E-mail já cadastrado.");
        if (companies.existsByCnpj(cnpj)) throw new ResourceConflictException("CNPJ já cadastrado.");

        Role clientRole = roles.findByName(ROLE_CLIENT)
                .orElseThrow(() -> new IllegalStateException("Papel CLIENT não existe no banco (rode o seed)."));

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(encoder.encode(req.password()));
        user.setPhone(req.phone() == null || req.phone().isBlank() ? null : req.phone().trim());
        user.setRole(clientRole);
        user = users.save(user);

        Company company = new Company();
        company.setName(req.companyName().trim());
        company.setCnpj(cnpj);
        company.setUser(user);
        companies.save(company);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest req) {
        String email = normalizeEmail(req.email());
        User user = users.findByEmail(email).orElse(null);
        if (user == null) {
            encoder.matches(req.password(), dummyHash);
            throw new AuthenticationFailedException(INVALID_CREDENTIALS);
        }
        if (!encoder.matches(req.password(), user.getPasswordHash())) {
            throw new AuthenticationFailedException(INVALID_CREDENTIALS);
        }
        String role = user.getRole().getName();
        if (ROLE_EMPLOYEE.equals(role)) {
            Employee e = employees.findByEmail(email).orElse(null);
            if (e == null || !e.isActive()) throw new AuthenticationFailedException(INVALID_CREDENTIALS);
        }
        return new LoginResponse(jwt.generate(user.getId(), role), jwt.lifetimeSeconds(), toSessionUser(user));
    }

    @Transactional(readOnly = true)
    public SessionUser me(Integer userId) {
        User user = users.findById(userId).orElseThrow(() -> new AuthenticationFailedException(INVALID_CREDENTIALS));
        return toSessionUser(user);
    }

    private SessionUser toSessionUser(User user) {
        String role = user.getRole().getName();
        String companyName = null;
        if (ROLE_CLIENT.equals(role)) {
            List<Company> list = companies.findByUserId(user.getId());
            if (!list.isEmpty()) companyName = list.get(0).getName();
        }
        return new SessionUser(user.getId(), user.getEmail(), role, companyName);
    }
}

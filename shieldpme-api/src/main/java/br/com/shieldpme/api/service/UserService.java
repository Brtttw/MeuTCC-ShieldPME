package br.com.shieldpme.api.service;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.shieldpme.api.entity.Role;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.RoleRepository;
import br.com.shieldpme.api.repository.UserRepository;

@Service
@Transactional
public class UserService {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository users, RoleRepository roles, PasswordEncoder passwordEncoder) {
        this.users = users; this.roles = roles; this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<User> findAll() { return users.findAll(); }

    @Transactional(readOnly = true)
    public User findById(Integer id) {
        return users.findById(id).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));
    }

    public User create(User user, Integer roleId) {
        user.setId(null);
        if (user.getEmail() == null || user.getEmail().isBlank()) throw new IllegalArgumentException("E-mail é obrigatório.");
        if (user.getPasswordHash() == null || user.getPasswordHash().length() < 8)
            throw new IllegalArgumentException("A senha deve possuir pelo menos 8 caracteres.");
        if (users.findByEmail(user.getEmail()).isPresent()) throw new IllegalArgumentException("E-mail já cadastrado.");
        Role role = roles.findById(roleId).orElseThrow(() -> new IllegalArgumentException("Perfil não encontrado: " + roleId));
        user.setRole(role);
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return users.save(user);
    }

    public User update(Integer id, User input) {
        User current = findById(id);
        if (input.getEmail() != null && !input.getEmail().isBlank() && !input.getEmail().equals(current.getEmail())) {
            if (users.findByEmail(input.getEmail()).isPresent()) throw new IllegalArgumentException("E-mail já cadastrado.");
            current.setEmail(input.getEmail());
        }
        if (input.getPhone() != null) current.setPhone(input.getPhone());
        if (input.getPasswordHash() != null && !input.getPasswordHash().isBlank()) {
            if (input.getPasswordHash().length() < 8) throw new IllegalArgumentException("A senha deve possuir pelo menos 8 caracteres.");
            current.setPasswordHash(passwordEncoder.encode(input.getPasswordHash()));
        }
        return users.save(current);
    }

    public void delete(Integer id) { users.delete(findById(id)); }
}

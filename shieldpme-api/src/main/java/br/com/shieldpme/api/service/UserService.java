package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.Role;
import br.com.shieldpme.api.entity.User;
import br.com.shieldpme.api.repository.RoleRepository;
import br.com.shieldpme.api.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    private final UserRepository users;
    private final RoleRepository roles;

    public UserService(UserRepository users, RoleRepository roles) {
        this.users = users;
        this.roles = roles;
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return users.findAll();
    }

    @Transactional(readOnly = true)
    public User findById(Integer id) {
        return users
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));
    }

    public User create(User u, Integer roleId) {
        u.setId(null);
        if (users.findByEmail(u.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }
        Role role = roles
                .findById(roleId)
                .orElseThrow(
                        () -> new IllegalArgumentException("Perfil não encontrado: " + roleId));
        u.setRole(role);
        return users.save(u);
    }

    public User update(Integer id, User in) {
        User u = findById(id);
        if (in.getEmail() != null && !in.getEmail().equals(u.getEmail())) {
            if (users.findByEmail(in.getEmail()).isPresent()) {
                throw new IllegalArgumentException("E-mail já cadastrado.");
            }
            u.setEmail(in.getEmail());
        }
        if (in.getPhone() != null) {
            u.setPhone(in.getPhone());
        }
        return users.save(u);
    }

    public void delete(Integer id) {
        users.delete(findById(id));
    }
}

package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    List<User> findByRoleId(Integer roleId);

    boolean existsByEmail(String email);

    /** Carrega o papel junto (o filtro JWT roda fora de transacao/sessao do Hibernate). */
    @Query("select u from User u join fetch u.role where u.id = :id")
    Optional<User> findWithRoleById(@Param("id") Integer id);


}

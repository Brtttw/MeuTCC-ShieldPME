package br.com.shieldpme.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findTop30ByRecipientIdOrderByCreatedAtDesc(Integer recipientId);

    long countByRecipientIdAndReadAtIsNull(Integer recipientId);

    Optional<Notification> findByIdAndRecipientId(Integer id, Integer recipientId);

    List<Notification> findByRecipientIdAndContractIdAndReadAtIsNull(Integer recipientId, Integer contractId);
}

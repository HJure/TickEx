package progi_project.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.Exchange;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {

    // Find exchanges by offerer ID
    List<Exchange> findByOfferer_Id(Long offererId);

    // Find exchanges by offeree ID
    List<Exchange> findByOfferee_Id(Long offereeId);

    // Find exchanges by offer ticket ID
    List<Exchange> findByOfferTicket_Id(Long offerTicketId);

    // Find exchanges by request ticket ID
    List<Exchange> findByRequestTicket_Id(Long requestTicketId);

    // Find exchanges created after a specific date
    List<Exchange> findByCreatedAtAfter(LocalDateTime dateTime);

    // Find exchanges that expire before a specific date
    List<Exchange> findByExpirationDateBefore(LocalDateTime dateTime);

    // Find all exchanges where the offer is still active (not expired)
    List<Exchange> findByExpirationDateAfter(LocalDateTime now);

    // Find exchanges by both offerer and offeree
    List<Exchange> findByOfferer_IdAndOfferee_Id(Long offererId, Long offereeId);

    // Find exchanges by created timestamp within a certain range
    List<Exchange> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    Exchange findById(int id);
}



package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi_project.model.Ticket;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find tickets by event name
    List<Ticket> findByEventName(String eventName);

    // Find tickets by owner
    List<Ticket> findByOwnerId(Long ownerId);

    // Find tickets by event type
    List<Ticket> findByEventType(String eventType);

    // Find tickets by event date
    List<Ticket> findByEventDate(LocalDateTime eventDate);

    // Find tickets by location
    List<Ticket> findByLocation(String location);

    // Find tickets by seat number
    List<Ticket> findBySeatNumber(String seatNumber);

    // Find tickets by ticket type
    List<Ticket> findByTicketType(String ticketType);

    // Find tickets by exchange availability
    List<Ticket> findByIsExchangeAvailable(boolean exchangeAvailable);


}

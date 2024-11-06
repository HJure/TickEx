package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import progi_project.model.Ticket;
import progi_project.model.User;
import progi_project.model.Vrsta_Dogadaja;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find tickets by event name
    //@Query("SELECT t FROM Ticket t WHERE t.nazDog = :eventName")
    Optional<Ticket> findByEventName(String eventName);

    // Find tickets by owner
    //@Query("SELECT t FROM Ticket t WHERE t.owner.id = :ownerId")
    Optional<Ticket> findByOwnerId(int ownerId);

    // Find tickets by event type
    //@Query("SELECT t FROM Ticket t WHERE t.eventTypeId = :eventType")
    Optional<Ticket> findByEventTypeId(Vrsta_Dogadaja eventTypeId);

    // Find tickets by event date
    //@Query("SELECT t FROM Ticket t WHERE t.eventDate = :eventDate")
    Optional<Ticket> findByEventDate(LocalDateTime eventDate);

    // Find tickets by location
    //@Query("SELECT t FROM Ticket t WHERE t.location = :location")
    Optional<Ticket> findByLocation(String location);

    // Find tickets by seat number
    //@Query("SELECT t FROM Ticket t WHERE t.seatNumber = :seatNumber")
    Optional<Ticket> findBySeatNumber(Integer seatNumber);

    // Find tickets by ticket type
    //@Query("SELECT t FROM Ticket t WHERE t.ticketType = :ticketType")
    Optional<Ticket> findByTicketType(String ticketType);

    // Find tickets by exchange availability
    //@Query("SELECT t FROM Ticket t WHERE t.isExchangeAvailable = :exchangeAvailable")
    Optional<Ticket> findByIsExchangeAvailable(boolean exchangeAvailable);

    // Find tickets by id
    //@Query("SELECT u FROM Ticket t WHERE t.id = :id")
    Optional<Ticket> findById(int id);


}

package progi_project.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import progi_project.model.Ticket;
import progi_project.model.TicketState;
import progi_project.model.Vrsta_Dogadaja;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    // Find tickets by event name
    //@Query("SELECT t FROM Ticket t WHERE t.nazDog = :eventName")
    Optional<Ticket> findByEventName(String eventName);

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
    Optional<Ticket> findByIsExchangeAvailable(TicketState exchangeAvailable);

    // Find tickets by id
    //@Query("SELECT u FROM Ticket t WHERE t.id = :id")
    Ticket findById(int id);

    // Delete ticket by id
    Optional<Ticket> deleteById(long id);

	List<Ticket> findAllByOwnerId(int userId);
    
	@Modifying
	@Query(value = "UPDATE oglas SET status = 'isteklo' WHERE datum < CURRENT_DATE AND status != 'prodano'", nativeQuery = true)
	int markExpiredTickets();
}

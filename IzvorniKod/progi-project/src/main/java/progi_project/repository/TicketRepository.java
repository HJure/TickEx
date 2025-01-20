package progi_project.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query(value = "UPDATE oglas SET status = 'istekao' WHERE datum <= CURRENT_DATE AND status <> 'istekao' AND status <> 'prodano'", 
    nativeQuery = true)
    int markExpiredTickets();

    @Query("SELECT t FROM Ticket t WHERE t.isExchangeAvailable <> 'istekao' AND t.isExchangeAvailable <> 'nepoznato'")
    List<Ticket> getTicketsNotExpired();
	
    @Query("SELECT t FROM Ticket t WHERE t.isExchangeAvailable = 'istekao' ")
    List<Ticket> getTicketsExpired();

    /* // Find tickets by user preferences
    @Query("SELECT t FROM Ticket t JOIN Genre g ON t.eventTypeId.id = g.iddog WHERE g.idkor = :idkor")
    List<Ticket> findAllByUserPreferences(@Param("idkor") int idkor);
 */
/*     @Query(value = "SELECT o " +
    "FROM Ticket o " +
    "JOIN Genre z ON o.eventTypeId.iddog = z.genre.id " +
    "WHERE z.user.id = :idkor " +
    "AND o.isExchangeAvailable IN ('u prodaji', 'razmjena', 'aukcija') " +
    "AND z.user.id NOT IN (SELECT s.user.id FROM Favorite s WHERE s.ticket.id = o.id)" + //nije vec lajkao kartu
    "AND z.user.id NOT IN (SELECT o1.owner.id FROM Ticket o1 WHERE o1.id = o.id)") //nije njegova karat )
    List<Ticket> findRecommendedTicketsById(@Param("idkor") int idkor); */
 

    @Query(value = "SELECT  o.idogl " +
        "FROM oglas o " +
        "JOIN zainteresiran z ON o.iddog = z.iddog " +
        "WHERE z.idkor = :idkor " +
        "AND o.status IN ('u prodaji', 'razmjena', 'aukcija') " +
        "AND z.idkor NOT IN (SELECT s.idkor FROM svida s WHERE s.idogl = o.idogl) " +
        "AND z.idkor NOT IN (SELECT o1.idkor FROM oglas o1 WHERE o1.idogl = o.idogl)", 
        nativeQuery = true)
    List<Integer> findRecommendedTicketsById(@Param("idkor") int idkor);
}

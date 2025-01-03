package progi_project.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import progi_project.model.Exchange;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
	
	@Query("SELECT e FROM Exchange e WHERE " +
          "e.eventName = :wantedEventName AND " +
          "e.location = :wantedLocation AND " +
          "e.eventDate = :wantedDate AND " +
          "(:wantedSeatNumber IS NULL OR e.seatNumber = :wantedSeatNumber) AND " +
          "(:wantedTicketType IS NULL OR e.ticketType = :wantedTicketType)")
  List<Exchange> findMatches(
          @Param("wantedEventName") String wantedEventName,
          @Param("wantedLocation") String wantedLocation,
          @Param("wantedDate") LocalDate wantedDate,
          @Param("wantedSeatNumber") Integer wantedSeatNumber,
          @Param("wantedTicketType") String wantedTicketType
  );
	    
	Exchange findById(int id);
	
	@Query("SELECT e FROM Exchange e")
	List<Exchange> findAll();
}



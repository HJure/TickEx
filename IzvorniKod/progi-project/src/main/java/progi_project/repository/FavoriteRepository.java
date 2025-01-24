package progi_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progi_project.model.Favorite;
import progi_project.model.Ticket;
import progi_project.model.User;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
  /*   @Modifying
    @Transactional
    @Query("DELETE FROM svida f WHERE f.idkor = :idkor AND f.idogl = :idogl")
    void deleteByUserIdAndTicketId(int idkor, int idogl); */
    @Modifying
    @Transactional
    void deleteByIdkorAndIdogl(int idkor, int idogl);

    // Find all tickets favorited by a user
    List<Favorite> findByidkor(int idkor);

    // Find all users who favorited a ticket
    List<Favorite> findByidogl(int idogl);

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId AND f.ticket.id = :ticketId")
    Favorite findByUserAndTicket(@Param("userId") int userId, @Param("ticketId") int ticketId);

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId AND f.like = TRUE")
	List<Favorite> getFavorites(int userId);

    @Query("SELECT t FROM Ticket t JOIN Favorite f ON t.id = f.ticket.id WHERE f.user.id = :userId AND f.like = false")
	List<Ticket> getHidden(int userId);
}

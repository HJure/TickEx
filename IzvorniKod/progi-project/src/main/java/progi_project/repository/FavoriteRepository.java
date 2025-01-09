package progi_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    void deleteByUserIdAndTicketId(int userId, int ticketId);

    // Find all tickets favorited by a user
    List<Favorite> findByUserId(int userId);

    // Find all users who favorited a ticket
    List<Favorite> findByTicketId(int ticketId);
}

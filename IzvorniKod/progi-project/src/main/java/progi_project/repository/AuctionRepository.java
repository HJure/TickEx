package progi_project.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import progi_project.model.Auction;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Optional<Auction> findByTicketIdOgl(int idOgl);

    @Query("SELECT * FROM Auction WHERE expDate <= :currentTime")
    List<Auction> findExpiredAuctions(LocalDateTime currentTime);
}

package progi_project.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import progi_project.model.Auction;
import progi_project.model.Bid;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Query("SELECT a FROM Auction a WHERE a.id = :id")
    Optional<Auction> findByIdOgl(@Param("id") int id);

    @Query("SELECT a FROM Auction a WHERE a.duration <= :currentTime")
    List<Auction> findExpiredAuctions(@Param("currentTime") LocalDate currentTime);

}

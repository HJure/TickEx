package progi_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import progi_project.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("SELECT * FROM Bid WHERE idogl = :id ORDER BY ponuda DESC")
    List<Bid> getBids(int id);
}

package progi_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
    // Custom query to check if a rating already exists between buyer and owner
    Optional<Rate> findByBuyerIDAndOwnerID(int buyerID, int ownerID);
}

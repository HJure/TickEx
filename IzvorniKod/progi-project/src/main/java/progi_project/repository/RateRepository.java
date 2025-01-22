package progi_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.Rate;
import progi_project.model.RateId;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
    // Nadji ocjenjivanje po id-u
    Optional<Rate> findById(RateId rateId);
}

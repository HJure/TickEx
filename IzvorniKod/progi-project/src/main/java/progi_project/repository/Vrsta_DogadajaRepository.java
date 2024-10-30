package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi_project.model.Ticket;
import progi_project.model.Vrsta_Dogadaja;

import java.util.Optional;

@Repository
public interface Vrsta_DogadajaRepository extends JpaRepository<Vrsta_Dogadaja, Integer> {

    Optional<Vrsta_Dogadaja> findById(int Id);

}


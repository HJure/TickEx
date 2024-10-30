package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi_project.model.Vrsta_Dogadaja;

@Repository
public interface Vrsta_DogadajaRepository extends JpaRepository<Vrsta_Dogadaja, Integer> {
    // You can define custom query methods here if needed
}


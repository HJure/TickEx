package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi_project.model.Vrsta_Dogadaja;

import java.util.List;
import java.util.Optional;

@Repository
public interface Vrsta_DogadajaRepository extends JpaRepository<Vrsta_Dogadaja, Integer> {

    Optional<Vrsta_Dogadaja> findById(int Id);

    @Query(value = "SELECT nazvrdog FROM vrsta_dogadaja", nativeQuery = true)
    List<String> findAllNames();
   @Query(value = "SELECT iddog FROM vrsta_dogadaja WHERE nazvrdog = :vrdog", nativeQuery = true)
    int findIdByName(@Param("vrdog") String vrdog);
   
   @Query(value = "SELECT nazvrdog FROM vrsta_dogadaja vd JOIN zainteresiran z ON vd.iddog = z.iddog WHERE z.idkor = :userId", nativeQuery = true)
   List<String> interestedIn(@Param("userId") int userId);
}


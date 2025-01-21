package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi_project.model.Deaktivira;
import java.util.List;


@Repository
public interface DeaktiviraRepository extends JpaRepository<Deaktivira, Integer> {

    // Custom query to find all records where a specific user was deactivated
    List<Deaktivira> findAllByDeaktiviranIdKor(int deaktiviranIdKor);

    // Custom query to find all records where a specific user deactivated others
    List<Deaktivira> findAllByDeaktiviraIdKor(int deaktiviraIdKor);

    boolean existsByDeaktiviranIdKor(int deaktiviranIdKor);

    void deleteAllByDeaktiviranIdKor(int deaktiviranIdKor);

}


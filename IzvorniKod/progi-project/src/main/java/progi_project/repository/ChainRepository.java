package progi_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import progi_project.model.Chain;

@Repository
public interface ChainRepository extends JpaRepository<Chain, Long> {

	@Query(value = "SELECT * FROM sudjeluje WHERE :id = ANY(idkor)", nativeQuery = true)
    List<Chain> findChainsByUserId(@Param("id") Integer id);
}

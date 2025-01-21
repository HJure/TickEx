package progi_project.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import progi_project.model.Chain;
import progi_project.model.Ticket;

@Repository
public interface ChainRepository extends JpaRepository<Chain, Long> {

	@Query(value = "SELECT * FROM sudjeluje WHERE :id = ANY(idkor)", nativeQuery = true)
    List<Chain> findChainsByUserId(@Param("id") Integer id);
	
	Chain findById(int id);

	@Query(value = "SELECT * FROM sudjeluje WHERE idsudj = :chainId", nativeQuery = true)
	Chain getResponsesByChainId(@Param("chainId") Integer chainId);

	@Modifying
    @Transactional
    @Query(value = "UPDATE sudjeluje SET odgovor = ARRAY_FILL(FALSE, ARRAY[ARRAY_LENGTH(odgovor, 1)]) WHERE idsudj = :chainId", nativeQuery = true)
	void updateAllResponses(@Param("chainId") int chainId);

	@Query(value = "SELECT * FROM sudjeluje WHERE :ticketId = ANY(idogl)", nativeQuery = true)
    List<Chain> findChainsByTicket(@Param("ticketId") int ticketId);

}

package progi_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
	// Find sale by idOgl
    Optional<Sale> findById(int id);
}

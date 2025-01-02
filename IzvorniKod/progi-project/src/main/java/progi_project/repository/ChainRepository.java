package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.Chain;

@Repository
public interface ChainRepository extends JpaRepository<Chain, Long> {
	
}

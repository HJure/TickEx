package progi_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import progi_project.model.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {

    
    @Modifying
    @Transactional
    void deleteByIdkorAndIddog(int idkor, int iddog);

    // Find all genres favorited by a user
    List<Genre> findByidkor(int idkor);
} 

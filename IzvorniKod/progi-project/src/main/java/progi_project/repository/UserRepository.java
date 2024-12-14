package progi_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi_project.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by email, Spring Data JPA will automatically implement this based on the method name
    Optional<User> findByEmail(String email);

    // Find user by id
    User findById(int id);

    // Check if email exists in the database
    boolean existsByEmail(String email);
}

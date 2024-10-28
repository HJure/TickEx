package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi_project.model.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find users by active status
    List<User> findByIsActive(boolean isActive);

    // Find users by username containing a specific substring
    List<User> findByUsernameContaining(String substring);

    // Find users by email containing a specific substring
    List<User> findByEmailContaining(String substring);

    // Find users by active status and username
    List<User> findByIsActiveAndUsername(boolean isActive, String username);

    // Find users by active status and email
    List<User> findByIsActiveAndEmail(boolean isActive, String email);
}


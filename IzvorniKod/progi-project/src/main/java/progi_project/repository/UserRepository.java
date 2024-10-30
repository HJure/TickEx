package progi_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import progi_project.model.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    // Find user by email
    //@Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);

    // Find users by id
    //@Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findById(int id);
}


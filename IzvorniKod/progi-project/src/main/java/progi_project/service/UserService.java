package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import progi_project.model.User;
import progi_project.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findById(int id) {
        return userRepository.findById(id); // Provjeri je li ovo ispravno postavljeno
    }
    

    /*public User findByOauthId(String oauthId) {
        return userRepository.findByOauthId(oauthId);
    }*/

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById((int) id);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public int getId(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)  
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));  // If user is not found, throws an exception
    }
}


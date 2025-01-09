package progi_project.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import progi_project.model.Favorite;
import progi_project.model.User;
import progi_project.model.Ticket;
import progi_project.repository.FavoriteRepository;
import progi_project.repository.TicketRepository;
import progi_project.repository.UserRepository;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    private String nonActiveTicketError(String errorMessage) {
        // Find where the actual error message starts (after "ERROR: ")
        String prefix = "ERROR: Oglas vise nije aktivan";
        if (errorMessage.contains(prefix)) {
            return "Oglas vise nije aktivan";
        }
        return errorMessage; // If "ERROR:" is not found, return the full message
    }

    public Favorite addFavorite(int userId, int ticketId) {
        User user = userRepository.findById(userId);
        Ticket ticket = ticketRepository.findById(ticketId);
        
        Favorite favorite = new Favorite(user, ticket);
        try{
            System.out.println(favorite.toString());
            return favoriteRepository.save(favorite);
        }catch(Exception  e){
            String msg = nonActiveTicketError(e.getMessage());
            
            System.out.println("\n ERROR IS " + msg + "\n");
            throw new RuntimeException(msg);
        }
        
    }

    public void removeFavorite(int userId, int ticketId) {
        
        favoriteRepository.deleteByUserIdAndTicketId(userId, ticketId);
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }
    public List<Favorite> getAllUserFavorites(int userId){
        return favoriteRepository.findByUserId(userId);
    }
    public List<Favorite> getAllTicketFavorites(int ticketId){
        //finds every user who favorited a ticket
        return favoriteRepository.findByTicketId(ticketId);
    }
    
}

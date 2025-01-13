package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Ticket;
import progi_project.service.FavoriteService;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<Ticket> getFavoriteTickets(@RequestParam int userId) {
        return favoriteService.getFavoriteTickets(userId);
    }

    @PostMapping
    public ResponseEntity<String> addFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        Integer userId = favoriteRequest.getUserId();
        Integer ticketId = favoriteRequest.getTicketId();   
        
        try {
            favoriteService.addFavorite(userId, ticketId);
            return ResponseEntity.ok("Favorite added successfully");
        } catch (Exception e) {
           return ResponseEntity.badRequest()
                .body("Error: " + e.getMessage());
        }
        

        
    }

    @DeleteMapping
    public ResponseEntity<String> removeFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.removeFavorite(favoriteRequest.getUserId(), favoriteRequest.getTicketId()); 
        return ResponseEntity.ok("Favorite removed successfully");
    }
    public static class FavoriteRequest {
        private Integer userId;
        private Integer ticketId;

        public FavoriteRequest() {
        }  
        public FavoriteRequest(Integer userId, Integer ticketId) {
            this.userId = userId;
            this.ticketId = ticketId;
        } 

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getTicketId() {
            return ticketId;
        }

        public void setTicketId(Integer ticketId) {
            this.ticketId = ticketId;
        }
    }
}

package progi_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.service.FavoriteService;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Add a favorite
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

    // Remove a favorite
    @DeleteMapping
    public ResponseEntity<String> removeFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.removeFavorite(favoriteRequest.getUserId(), favoriteRequest.getTicketId()); 
        return ResponseEntity.ok("Favorite removed successfully");
    }
    public static class FavoriteRequest {
        private Integer userId;
        private Integer ticketId;

        // Getters and setters
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

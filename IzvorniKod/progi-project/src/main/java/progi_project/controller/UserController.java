package progi_project.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Sale;
import progi_project.model.Ticket;
import progi_project.model.User;
import progi_project.service.TicketService;
import progi_project.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private TicketService ticketService;
    
    @Value("${ticket.expiration.minutes}")
    private long expirationMinutes;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.findById(id);
    }

    @GetMapping("/getId")
    public int getUserId(@RequestParam("email") String email) {
        return userService.getId(email);
    }    

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/rate/{rating}")
    public boolean canRateUser(@RequestBody Sale sale, @PathVariable int rating) {
        User buyer = sale.getBuyer();
        User owner = sale.getOwner();

        boolean isRated = userService.rateUser(buyer, owner, rating);
        return isRated;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{userId}/tickets")
    public ResponseEntity<List<Ticket>> getUserTickets(@PathVariable int userId) {
        List<Ticket> tickets = ticketService.getTicketsByUser(userId);
        LocalDateTime now = LocalDateTime.now();

        tickets.stream()
            .filter(ticket -> "obrisano".equals(ticket.getisExchangeAvailable()) && ticket.getObrisanoTime() != null)
            .filter(ticket -> ticket.getObrisanoTime().isBefore(now.minusMinutes(expirationMinutes)))
            .forEach(ticket -> {
                ticket.setExchangeAvailable("isteklo");
                ticket.setObrisanoTime(null);
                ticketService.updateTicket(ticket);
            });

        return ResponseEntity.ok(tickets);
    }
    
}


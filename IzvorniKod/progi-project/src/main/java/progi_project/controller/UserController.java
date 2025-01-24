package progi_project.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import progi_project.service.FavoriteService;
import progi_project.service.ReportService;
import progi_project.service.TicketService;
import progi_project.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;
    
    @Autowired
    private TicketService ticketService;
    
    
    @Value("${ticket.expiration.minutes}")
    private long expirationMinutes;

    @GetMapping("/isAdmin")
    public boolean isAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    
        if(isAdmin)
            return true;
        else
            return false;
    }

    @GetMapping("/isUser")
    public boolean isUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
        boolean isUser = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN") || 
                		authority.getAuthority().equals("ROLE_USER"));
    
        return isUser;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/report")
    public ResponseEntity<String> reportUser(@RequestParam int reporterId, @RequestParam int reportedId, @RequestParam String reason) {
        reportService.createReport(reporterId, reportedId, reason);
        return ResponseEntity.ok("Report submitted successfully");
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
    	try {
            user.setId(id);
            User updatedUser = userService.updateUser(user);
            System.out.println("Updated User: " + updatedUser);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
                ticket.setExchangeAvailable("istekao");
                ticket.setObrisanoTime(null);
                ticketService.updateTicket(ticket.getId(), ticket);
            });

        return ResponseEntity.ok(tickets);
    }
    
}


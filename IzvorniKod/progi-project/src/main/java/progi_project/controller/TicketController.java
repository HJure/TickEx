package progi_project.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Ticket;
import progi_project.repository.UserRepository;
import progi_project.service.TicketService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable int id) {
        return ticketService.findById(id);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
        ticket.setId(id);
        Ticket updatedTicket = ticketService.updateTicket(ticket);
        return ResponseEntity.ok(updatedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateTicketStatus(@PathVariable int id, @RequestBody Map<String, String> statusMap) {
    	String status = statusMap.get("status");
    	if(status.equals("obrisano")) {
    		Ticket ticket = getTicketById(id);
    		ticket.setObrisanoTime(LocalDateTime.now());
    	}
    	ticketService.updateTicketStatus(id, status);
        return ResponseEntity.noContent().build();
    }
    // Lajkanje karte
   /*  @PostMapping("/{id}/favorite")
    public ResponseEntity<Ticket> favoriteTicket(@PathVariable int id, @RequestBody int userId) {
       
        ticketService.favoriteTicket(id, userId);
        //System.out.println("User["+ userId +"] favorite tickets are" + userRepository.getById(userId).getFavoriteTickets() + "\n");
        return ResponseEntity.noContent().build();
    }  */
}

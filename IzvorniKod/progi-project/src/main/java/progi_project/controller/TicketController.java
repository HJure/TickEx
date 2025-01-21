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
import progi_project.service.FavoriteService;
import progi_project.service.TicketService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;
    
    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable int id) {
        return ticketService.findById(id);
    }
    
    @GetMapping("/recommended/{id}")
    public List<Ticket> getRecommended(@PathVariable int id) {
        return ticketService.getRecommendedTickets(id);
    }
    
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }
    
    @GetMapping("/nothidden/{id}")
    public List<Ticket> getAllTickets(@PathVariable int id) {
    	List<Ticket> allTickets = ticketService.getAllTickets();
    	List<Ticket> hiddenTickets = favoriteService.getHiddenTickets(id);
    	System.out.println("Proba:" + allTickets.size() + " "+ hiddenTickets.size());
    	allTickets.removeAll(hiddenTickets);
        return allTickets;
    }

    @GetMapping("/active")
    public List<Ticket> getActiveTickets(){
    	return ticketService.getTicketsNotExpired();
    }
    
    @GetMapping("/expired")
    public List<Ticket> getTicketsExpired() {
        //vrati istekle oglase
        return ticketService.getTicketsExpired();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
       
        Ticket updatedTicket = ticketService.updateTicket(id, ticket);
        
       
        return ResponseEntity.ok(updatedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable int id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateTicketStatus(@PathVariable int id, @RequestBody Map<String, String> statusMap) {
    	String status = statusMap.get("status");
    	if(status.equals("obrisano")) {
    		Ticket ticket = getTicketById(id);
    		ticket.setObrisanoTime(LocalDateTime.now());
    	}else {
    		Ticket ticket = getTicketById(id);
    		ticket.setObrisanoTime(null);
    	}
    	ticketService.updateTicketStatus(id, status);
        return ResponseEntity.noContent().build();
    }
   
}

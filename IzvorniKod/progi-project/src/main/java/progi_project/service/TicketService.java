package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import progi_project.model.User;
import progi_project.model.Ticket;
import progi_project.repository.TicketRepository;
import progi_project.repository.UserRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private UserRepository userRepository;

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket findById(int id) {
        return ticketRepository.findById(id);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getTicketsNotExpired() {
        return ticketRepository.getTicketsNotExpired();
    }

    public List<Ticket> getTicketsExpired() {
        return ticketRepository.getTicketsExpired();
    }
    public Ticket updateTicket(int id, Ticket updatedTicket) {
        // Mora se dobaviti postojeca karta jer inace hibernate baca error
        Ticket existingTicket = ticketRepository.findById(id);
                                            

        
        existingTicket.setEventName(updatedTicket.getEventName());
        existingTicket.setLocation(updatedTicket.getLocation());
        existingTicket.setEventDate(updatedTicket.getEventDate());
        existingTicket.setSeatNumber(updatedTicket.getSeatNumber());
        existingTicket.setTicketType(updatedTicket.getTicketType());

        
        return ticketRepository.save(existingTicket);
    }

    // Delete a ticket by ID
    @Transactional
    public void deleteTicket(int id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Ticket with ID " + id + " does not exist.");
        }
    }
    
    public void updateTicketStatus(int id, String status) {
        Ticket ticket = ticketRepository.findById(id);
        ticket.setExchangeAvailable(status);
        ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUser(int userId) {
        return ticketRepository.findAllByOwnerId(userId);
    }
    
    @Transactional
    public int markExpiredTickets() {
        return ticketRepository.markExpiredTickets();
    }
  

    

   
}

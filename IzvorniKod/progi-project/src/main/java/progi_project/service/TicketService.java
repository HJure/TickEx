package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Ticket updateTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
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

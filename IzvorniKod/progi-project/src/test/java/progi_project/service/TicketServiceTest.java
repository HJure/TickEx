package progi_project.service;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import jakarta.persistence.EntityNotFoundException;
import progi_project.model.Ticket;
import progi_project.repository.TicketRepository;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Test
    public void testCreateTicket() {
        Ticket ticket = new Ticket();
        ticketService.createTicket(ticket);
        verify(ticketRepository, times(1)).save(ticket);
    }

    @Test
    public void testFindById_ValidId() {
        int id = 1;
        Ticket ticket = new Ticket();
        ticket.setId(id);
        when(ticketRepository.findById(id)).thenReturn(ticket);

        Ticket result = ticketService.findById(id);

        assertEquals(ticket, result);
        verify(ticketRepository, times(1)).findById(id);
    }

    @Test
    public void testFindById_InvalidId() {
        int id = 84698384;
        when(ticketRepository.findById(id)).thenReturn(null);

        Ticket result = ticketService.findById(id);

        assertNull(result);
        verify(ticketRepository, times(1)).findById(id);
    }

    @Test
    public void testGetAllTickets() {
        List<Ticket> tickets = new ArrayList<>();
        when(ticketRepository.findAll()).thenReturn(tickets);

        List<Ticket> result = ticketService.getAllTickets();

        assertEquals(tickets, result);
        verify(ticketRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateTicket() {
        int id = 1;
        Ticket existingTicket = new Ticket();
        existingTicket.setId(id);
        Ticket updatedTicket = new Ticket();
        when(ticketRepository.findById(id)).thenReturn(existingTicket);

        ticketService.updateTicket(id, updatedTicket);

        verify(ticketRepository, times(1)).save(existingTicket);
    }

    @Test
    public void testDeleteTicket_ValidId() {
        int id = 1;
        when(ticketRepository.existsById(id)).thenReturn(true);

        ticketService.deleteTicket(id);

        verify(ticketRepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteTicket_InvalidId() {
        int id = 1;
        when(ticketRepository.existsById(id)).thenReturn(false);

        assertThrows(EntityNotFoundException.class, () -> { ticketService.deleteTicket(id);});

        verify(ticketRepository, times(0)).deleteById(id);
    }
}
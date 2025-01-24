package progi_project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import progi_project.model.Ticket;
import progi_project.service.FavoriteService;
import progi_project.service.TicketService;

@ExtendWith(MockitoExtension.class)
public class TicketControllerTest {

    @Mock
    private TicketService ticketService;

    @Mock
    private FavoriteService favoriteService;

    @InjectMocks
    private TicketController ticketController;

    @Test
    public void testCreateTicket() {
        Ticket ticket = new Ticket();
        ticketController.createTicket(ticket);
        verify(ticketService, times(1)).createTicket(ticket);
    }

    @Test
    public void testGetTicketById_ValidId() {
        int id = 1;
        Ticket ticket = new Ticket();
        ticket.setId(id);
        when(ticketService.findById(id)).thenReturn(ticket);

        Ticket result = ticketController.getTicketById(id);

        assertEquals(ticket, result);
        verify(ticketService, times(1)).findById(id);
    }

    @Test
    public void testGetTicketById_InvalidId() {
        int id = 1;
        when(ticketService.findById(id)).thenReturn(null);

        Ticket result = ticketController.getTicketById(id);

        assertNull(result);
        verify(ticketService, times(1)).findById(id);
    }

    @Test
    public void testGetRecommendedTickets() {
        int userId = 1;
        List<Ticket> recommendedTickets = new ArrayList<>();
        when(ticketService.getRecommendedTickets(userId)).thenReturn(recommendedTickets);

        List<Ticket> result = ticketController.getRecommended(userId);

        assertEquals(recommendedTickets, result);
        verify(ticketService, times(1)).getRecommendedTickets(userId);
    }

    @Test
    public void testGetAllTickets() {
        List<Ticket> allTickets = new ArrayList<>();
        when(ticketService.getAllTickets()).thenReturn(allTickets);

        List<Ticket> result = ticketController.getAllTickets();

        assertEquals(allTickets, result);
        verify(ticketService, times(1)).getAllTickets();
    }

    @Test
    public void testUpdateTicketStatus() {
        int id = 1;
        Map<String, String> statusMap = new HashMap<>();
        statusMap.put("status", "obrisano");
        Ticket ticket = new Ticket();
        ticket.setId(id);
        when(ticketService.findById(id)).thenReturn(ticket);

        ticketController.updateTicketStatus(id, statusMap);

        verify(ticketService, times(1)).updateTicketStatus(id, "obrisano");
    }
}
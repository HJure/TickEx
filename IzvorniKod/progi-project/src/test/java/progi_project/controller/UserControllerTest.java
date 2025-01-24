package progi_project.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import progi_project.model.Ticket;
import progi_project.model.User;
import progi_project.service.ReportService;
import progi_project.service.TicketService;
import progi_project.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private ReportService reportService;

    @Mock
    private TicketService ticketService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testReportUser_ReportUser() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";
        userController.reportUser(reporterId, reportedId, reason);
        verify(reportService, times(1)).createReport(reporterId, reportedId, reason);
    }

    @Test
    public void testGetUserById_ValidId() {
        int id = 1;
        User user = new User();
        user.setId(id);
        when(userService.findById(id)).thenReturn(user);

        User result = userController.getUserById(id);

        assertEquals(user, result);
        verify(userService, times(1)).findById(id);
    }

    @Test
    public void testGetUserById_InvalidId() {
        int id = 84698384;
        when(userService.findById(id)).thenReturn(null);

        User result = userController.getUserById(id);

        assertNull(result);
        verify(userService, times(1)).findById(id);
    }

    // Obicna registracija
    @Test
    public void testRegisterUser_Success() {
        LocalDate registrationDate = LocalDate.of(2024, 11, 1);
        User user = new User("peroperic@gmail.com", "Pero", "Peric", registrationDate);
        
        when(userService.registerUser(user)).thenReturn(user);

        User registeredUser = userController.registerUser(user);

        assertNotNull(registeredUser);
        assertEquals("Pero", registeredUser.getImeKor());
        assertEquals("Peric", registeredUser.getPrezimeKor());
        assertEquals("peroperic@gmail.com", registeredUser.getEmail());
        assertTrue(registeredUser.isStatusKor());
        assertEquals(0.0f, registeredUser.getOcjena());
        verify(userService, times(1)).registerUser(user);
    }

    // Dohvati korisnika sa nepostojećim ID-jem
    @Test
    public void testGetUserById_UserNotFound() {
        int id = 84698384;
        when(userService.findById(id)).thenReturn(null);

        User user = userController.getUserById(id);

        assertNull(user);
        verify(userService, times(1)).findById(id);
    }

    // Dohvati korisnikove ulaznice(korisnik nema ulaznica)
    @SuppressWarnings("null")
    @Test
    public void testGetUserTickets_NoTickets() {
        int id = 1;
        List<Ticket> emptyTicketList = Collections.emptyList();
        when(ticketService.getTicketsByUser(id)).thenReturn(emptyTicketList);

        ResponseEntity<List<Ticket>> response = userController.getUserTickets(id);

        assertNotNull(response);
        assertEquals(0, response.getBody().size());
        verify(ticketService, times(1)).getTicketsByUser(id);
    }
}
package progi_project.controller;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import progi_project.model.Report;
import progi_project.model.ReportRequest;
import progi_project.service.ReportService;
import progi_project.service.UserService;

@ExtendWith(MockitoExtension.class)
public class ReportControllerTest {

    @InjectMocks
    private ReportController reportController;

    @Mock
    private ReportService reportService;

    @Mock
    private UserService userService;

    @Test
    public void testGetReports_Admin() {
        List<Report> expectedReports = new ArrayList<>();
        when(reportService.getTopSixReports()).thenReturn(expectedReports);

        Authentication mockAdminAuth = mock(Authentication.class);
        doReturn(List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))).when(mockAdminAuth).getAuthorities();

        SecurityContext mockSecurityContext = mock(SecurityContext.class);
        when(mockSecurityContext.getAuthentication()).thenReturn(mockAdminAuth);
        SecurityContextHolder.setContext(mockSecurityContext);

        ResponseEntity<?> response = reportController.getReports();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedReports, response.getBody());
    }

    @Test
    public void testGetReports_NotAdmin() {
        Authentication mockUserAuth = mock(Authentication.class);
        doReturn(List.of(new SimpleGrantedAuthority("ROLE_USER"))).when(mockUserAuth).getAuthorities();

        SecurityContext mockSecurityContext = mock(SecurityContext.class);
        when(mockSecurityContext.getAuthentication()).thenReturn(mockUserAuth);
        SecurityContextHolder.setContext(mockSecurityContext);

        ResponseEntity<?> response = reportController.getReports();

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals(List.of("Access denied: You don't have permission to view reports."), response.getBody());
    }

    @Test
    public void testCanReport_ValidReport() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";
        ReportRequest reportRequest = new ReportRequest(reporterId, reportedId, reason);

        when(userService.canReportUser(reporterId, reportedId)).thenReturn(true);

        boolean canReport = reportController.canReport(reportRequest);

        assertTrue(canReport);
        verify(reportService, times(1)).createReport(reporterId, reportedId, reason);
    }

    @Test
    public void testCanReport_ReportingSelf() {
        int reporterId = 1;
        int reportedId = reporterId; 
        String reason = "Test reason";
        ReportRequest reportRequest = new ReportRequest(reporterId, reportedId, reason);

        boolean canReport = reportController.canReport(reportRequest);

        assertFalse(canReport);
        verify(userService, times(0)).canReportUser(reporterId, reportedId);
        verify(reportService, times(0)).createReport(reporterId, reportedId, reason);
    }


    @Test
    public void testCanReport_InvalidReport() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";
        ReportRequest reportRequest = new ReportRequest(reporterId, reportedId, reason);

        when(userService.canReportUser(reporterId, reportedId)).thenReturn(false);

        boolean canReport = reportController.canReport(reportRequest);

        assertFalse(canReport);
        verify(userService, times(1)).canReportUser(reporterId, reportedId);
        verify(reportService, times(0)).createReport(reporterId, reportedId, reason);
    }
}
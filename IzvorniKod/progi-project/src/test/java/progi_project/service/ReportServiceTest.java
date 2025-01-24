package progi_project.service;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import progi_project.model.Report;
import progi_project.model.User;
import progi_project.repository.ReportRepository;
import progi_project.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class ReportServiceTest {

    @InjectMocks
    private ReportService reportService;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    void testCreateReport_ValidIds() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";

        User reporter = new User();
        reporter.setId(reporterId);
        User reported = new User();
        reported.setId(reportedId);

        when(userRepository.findById(reporterId)).thenReturn(reporter);
        when(userRepository.findById(reportedId)).thenReturn(reported);

        reportService.createReport(reporterId, reportedId, reason);

        verify(reportRepository, times(1)).save(argThat(report -> 
            report.getReporter().getId() == reporterId &&
            report.getReported().getId() == reportedId &&
            report.getReason().equals(reason) &&
            report.getReportDate() != null
        ));
    }

    @Test
    void testCreateReport_InvalidReporterId() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";

        when(userRepository.findById(reporterId)).thenReturn(null);

        reportService.createReport(reporterId, reportedId, reason);

        verify(reportRepository, times(0)).save(any());
    }

    @Test
    void testCreateReport_InvalidReportedId() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = "Test";

        when(userRepository.findById(reporterId)).thenReturn(new User());
        when(userRepository.findById(reportedId)).thenReturn(null);

        reportService.createReport(reporterId, reportedId, reason);

        verify(reportRepository, times(0)).save(any());
    }

    @Test
    void testCreateReport_NullReason() {
        int reporterId = 1;
        int reportedId = 2;
        String reason = null;

        User reporter = new User();
        reporter.setId(reporterId);
        User reported = new User();
        reported.setId(reportedId);

        when(userRepository.findById(reporterId)).thenReturn(reporter);
        when(userRepository.findById(reportedId)).thenReturn(reported);

        reportService.createReport(reporterId, reportedId, reason);

        verify(reportRepository, times(1)).save(argThat(report -> 
            report.getReason() == null
        ));
    }

    @Test
    void testGetTopReports() {
        List<Report> reports = Arrays.asList(new Report(), new Report(), new Report());
        when(reportRepository.findTopSixReports()).thenReturn(reports);

        List<Report> result = reportService.getTopSixReports();

        assertEquals(reports, result);
        verify(reportRepository, times(1)).findTopSixReports();
    }
}

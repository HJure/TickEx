package progi_project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Report;
import progi_project.model.Report.ReportId;
import progi_project.model.User;
import progi_project.repository.ReportRepository;
import progi_project.repository.UserRepository;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    public void createReport(int reporterId, int reportedId, String reason) {
        User reporter = userRepository.findById(reporterId);
        User reported = userRepository.findById(reportedId);

        Report report = new Report();
        report.setId(new ReportId(reporterId, reportedId));
        report.setReporter(reporter);
        report.setReported(reported);
        report.setReason(reason);

        reportRepository.save(report);
    }

    public List<Report> getTopSixReports() {
        return reportRepository.findTopSixReports();
    }
}

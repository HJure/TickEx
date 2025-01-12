package progi_project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import progi_project.model.Report;

public interface  ReportRepository extends JpaRepository<Report, Long>{

    @Query("SELECT r FROM Report r ORDER BY r.reportDate DESC LIMIT 50")
    List<Report> findTopSixReports();

    Optional<Report> findById(Report.ReportId reportId);
}

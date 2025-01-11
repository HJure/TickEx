package progi_project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "prijavljuje")
public class Report {

    @EmbeddedId
    private ReportId id;

    @Column(name = "razlog", nullable = false, length = 250)
    private String reason;

    @ManyToOne
    @MapsId("reporterId")
    @JoinColumn(name = "prijavljujeidkor", referencedColumnName = "idkor")
    private User reporter;

    @ManyToOne
    @MapsId("reportedId")
    @JoinColumn(name = "prijavljenidkor", referencedColumnName = "idkor")
    private User reported;

    @Column(name = "datumpri", nullable = false)
    private LocalDate reportDate = LocalDate.now();

    public ReportId getId() {
        return id;
    }

    public void setId(ReportId id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public User getReported() {
        return reported;
    }

    public void setReported(User reported) {
        this.reported = reported;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    // ugnjezdena klasa za kompozicijski kljuc
    @Embeddable
    public static class ReportId implements Serializable {
        private int reporterId;
        private int reportedId;

        public ReportId() {}

        public ReportId(int reporterId, int reportedId) {
            this.reporterId = reporterId;
            this.reportedId = reportedId;
        }

        public int getReporterId() {
            return reporterId;
        }

        public void setReporterId(int reporterId) {
            this.reporterId = reporterId;
        }

        public int getReportedId() {
            return reportedId;
        }

        public void setReportedId(int reportedId) {
            this.reportedId = reportedId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ReportId reportId = (ReportId) o;
            return Objects.equals(reporterId, reportId.reporterId) && Objects.equals(reportedId, reportId.reportedId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(reporterId, reportedId);
        }
    }
}

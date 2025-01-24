package progi_project.model;

public class ReportRequest {
    private int reporterId;
    private int reportedId;
    private String reason;

    

    public ReportRequest(int reporterId, int reportedId, String reason) {
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.reason = reason;
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

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}

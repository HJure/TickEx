package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<?> getReports() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    
        if (isAdmin) {
            return ResponseEntity.ok(reportService.getTopSixReports());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(List.of("Access denied: You don't have permission to view reports."));
        }
    }
}


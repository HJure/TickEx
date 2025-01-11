package progi_project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progi_project.repository.TicketRepository;

@Service
public class ScheduledTaskService  {
    
    @Autowired
    private TicketRepository ticketRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void markExpiredTicketsOnStartup() {
        int updatedCount = ticketRepository.markExpiredTickets();
        System.out.println("Number of tickets marked as expired on startup: " + updatedCount);
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void markExpiredTickets() {
        ticketRepository.markExpiredTickets();
        System.out.println("Number of tickets marked as expired: " + ticketRepository.markExpiredTickets());
     }
}

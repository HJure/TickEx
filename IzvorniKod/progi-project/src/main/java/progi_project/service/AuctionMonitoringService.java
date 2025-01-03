package progi_project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import progi_project.model.Auction;
import progi_project.repository.AuctionRepository;

@Service
public class AuctionMonitoringService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private AuctionService auctionService;

    @Scheduled(fixedRate = 60000) // Provjeravaj svaku minutu
    public void monitorAuctions() {
        LocalDateTime currentTime = LocalDateTime.now();

        List<Auction> expiredAuctions = auctionRepository.findExpiredAuctions(currentTime);

        for (Auction auction : expiredAuctions) {
            auctionService.resolveAuction(auction);
        }
    }
}

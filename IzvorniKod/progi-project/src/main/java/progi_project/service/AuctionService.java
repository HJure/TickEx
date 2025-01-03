package progi_project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progi_project.model.Auction;
import progi_project.model.Bid;
import progi_project.repository.AuctionRepository;
import progi_project.repository.BidRepository;

@Service
@Transactional
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private BidRepository bidRepository;

    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }

    public Auction createAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    public void resolveAuction(Auction auction) {
        List<Bid> bids = bidRepository.getBids(auction.getId());
        if (bids.isEmpty()) {
            auction.setExchangeAvailable("nepoznato");
        } else {
            Bid highestBid = bids.get(0);
            auction.setExchangeAvailable("prodano");
            auction.setOwner(highestBid.getUser());
        }

        auctionRepository.save(auction);
    }

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid createBid(Bid bid) {
        // pretpostavka da se ponuda može mijenjati do isteka aukcije
        return bidRepository.save(bid);
    }
}

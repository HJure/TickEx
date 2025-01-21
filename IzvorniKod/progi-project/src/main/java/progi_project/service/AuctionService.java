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

    public void createAuction(Auction auction) {
        auctionRepository.save(auction);
    }

    public void resolveAuction(Auction auction) {
        List<Bid> bids = bidRepository.getBids(auction.getId());
        if (bids.isEmpty()) {
            auction.setExchangeAvailable("istekao");
        } else {
            Bid highestBid = bids.get(0);
            auction.setExchangeAvailable("prodano");
            auction.setWinner(highestBid.getUser());
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

    public Auction updateAuction(Long id, Auction auction) {
        Auction existingAuction = auctionRepository.findById(id).orElseThrow(() -> new RuntimeException("Auction not found"));
        existingAuction.setStartPrice(auction.getStartPrice());
        existingAuction.setDuration(auction.getDuration());
        existingAuction.setEventName(auction.getEventName());
        existingAuction.setLocation(auction.getLocation());
        existingAuction.setEventDate(auction.getEventDate());
        existingAuction.setSeatNumber(auction.getSeatNumber());
        existingAuction.setTicketType(auction.getTicketType());
        existingAuction.setEventTypeId(auction.getEventTypeId());
        existingAuction.setArtistName(auction.getArtistName());
        return auctionRepository.save(existingAuction);
    }

	public List<Bid> getAllBidsForAuction(int id) {
		return bidRepository.getBids(id);
	}
}

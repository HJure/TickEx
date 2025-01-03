package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Auction;
import progi_project.model.Bid;
import progi_project.service.AuctionService;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @GetMapping
    public List<Auction> getAuctions() {
        return auctionService.getAllAuctions();
    }
    
    @PostMapping
    public Auction createAuction(@RequestBody Auction auction) {
        return auctionService.createAuction(auction);
    } 

    @GetMapping("/bids")
    public List<Bid> getBids() {
        return auctionService.getAllBids();
    }
    
    @PostMapping("/bids")
    public Bid createBid(@RequestBody Bid bid) {
        return auctionService.createBid(bid);
    } 
}

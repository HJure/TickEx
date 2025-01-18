package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void createAuction(@RequestBody Auction auction) {
        auctionService.createAuction(auction);
    } 

    @GetMapping("/bids")
    public List<Bid> getBids() {
        return auctionService.getAllBids();
    }
    
    @PostMapping("/bids")
    public Bid createBid(@RequestBody Bid bid) {
        return auctionService.createBid(bid);
    } 

    @PutMapping("/{id}")
    public Auction updateAuction(@PathVariable Long id, @RequestBody Auction auction) {
        return auctionService.updateAuction(id, auction);
    }
}

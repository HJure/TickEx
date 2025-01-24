package progi_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "nudi")
public class Bid {
    @EmbeddedId
    private BidId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "idkor", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("auctionId")
    @JoinColumn(name = "idogl", nullable = false)
    private Auction auction;

    @Column(name = "ponuda", nullable = false)
    private int offer;

    public Bid() {}

    public Bid(User user, Auction auction, int offer) {
        this.user = user;
        this.auction = auction;
        this.offer = offer;
        this.id = new BidId(user.getId(), auction.getId());
    }

    public BidId getId() {
        return id;
    }

    public void setId(BidId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public int getOffer() {
        return offer;
    }

    public void setOffer(int offer) {
        this.offer = offer;
    }
}

package progi_project.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class BidId implements Serializable {
    @Column(name = "idkor", nullable = false)
    private int userId;

    @Column(name = "idogl", nullable = false)
    private int auctionId;

    public BidId() {}

    public BidId(int userId, int auctionId) {
        this.userId = userId;
        this.auctionId = auctionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(int auctionId) {
        this.auctionId = auctionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BidId bidId = (BidId) o;
        return userId == bidId.userId && auctionId == bidId.auctionId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, auctionId);
    }
}
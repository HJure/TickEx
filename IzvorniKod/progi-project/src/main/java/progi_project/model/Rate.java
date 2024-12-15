package progi_project.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Rate {
    @EmbeddedId
    private RateId id;

    @ManyToOne
    @JoinColumn(name = "ocjenjujeidkor", insertable = false, updatable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "ocijenjenidkor", insertable = false, updatable = false)
    private User owner;

    private int ocjena;

    public Rate(User buyer, User owner, int ocjena) {
        this.id = new RateId(buyer.getId(), owner.getId());
        this.buyer = buyer;
        this.owner = owner;
        this.ocjena = ocjena;
    }

    public Rate() {
        
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public int getOcjena() {
        return ocjena;
    }

    public void setOcjena(int ocjena) {
        this.ocjena = ocjena;
    }
}
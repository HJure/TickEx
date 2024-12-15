package progi_project.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import progi_project.model.User;

@Entity
public class Rate {
    @ManyToOne
    @JoinColumn(name = "idKor_1", insertable = false, updatable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "ocjenjujeidKor_2", insertable = false, updatable = false)
    private User owner;

    public Rate(User owner2, User buyer2){
        this.buyer = buyer2;
        this.owner = owner2;
    }

    public Rate(){

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
}

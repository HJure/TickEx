package progi_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prodaja")
public class Sale extends Ticket {

    @Column(name = "cijena", nullable = false)
    private int price;

    @ManyToOne
    @JoinColumn(name = "idKor")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "kupujeidKor")
    private User buyer;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

}

package progi_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "prodaja")
@PrimaryKeyJoinColumn(name = "idogl")
public class Sale extends Ticket {

    @Column(name = "cijena", nullable = false)
    private int price;

    @ManyToOne
    @JoinColumn(name = "idkupac", nullable = true)
    private User buyer;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

}

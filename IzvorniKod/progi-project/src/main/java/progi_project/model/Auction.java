package progi_project.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "aukcija")
@PrimaryKeyJoinColumn(name = "idogl")
public class Auction extends Ticket{
    @Column(name = "poccijena", nullable = false)
    private int startPrice;

    @Column(name = "trajanje", nullable = false)
    private LocalDate duration;

    public int getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(int startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDate getTrajanje() {
        return duration;
    }

    public void setTrajanje(LocalDate duration) {
        this.duration = duration;
    }
}


package progi_project.model;

import java.time.Duration;

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
    private Duration duration;

    public int getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(int startPrice) {
        this.startPrice = startPrice;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }
}


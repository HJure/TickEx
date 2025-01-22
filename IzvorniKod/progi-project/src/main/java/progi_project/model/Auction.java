package progi_project.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    
    @ManyToOne
    @JoinColumn(name = "pobjednik", nullable = true)
    private User winner;
    
    @Column(name = "koncijena", nullable = true)
    private int endPrice;

    public int getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(int startPrice) {
        this.startPrice = startPrice;
    }

	public LocalDate getDuration() {
		return duration;
	}

	public void setDuration(LocalDate duration) {
		this.duration = duration;
	}

	public User getWinner() {
		return winner;
	}

	public void setWinner(User winner) {
		this.winner = winner;
	}

	public int getEndPrice() {
		return endPrice;
	}

	public void setEndPrice(int endPrice) {
		this.endPrice = endPrice;
	}
	
	
	
}


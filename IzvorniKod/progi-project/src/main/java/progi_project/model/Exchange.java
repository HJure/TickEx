package progi_project.model;

import java.time.LocalDate;
import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;


@Entity
@Table(name = "razmjena")
@PrimaryKeyJoinColumn(name = "idogl")
public class Exchange extends Ticket{
    	  
	@Column(name="zeljeninazogl", nullable = false)
    private String wantedEventName;
	
	@Column(name="zeljenomjesto", nullable = false)
    private String wantedLocation;

    @Column(name="zeljenidatum", nullable = false)
    private LocalDate wantedDate;

    @Column(name="zeljenibrsje", nullable = true)
    private Integer wantedSeatNumber;

    @Column(name="zeljenavrsula", nullable = true)
    private String wantedTicketType;

	public String getWantedEventName() {
		return wantedEventName;
	}
	
	public void setWantedEventName(String wantedEventName) {
		this.wantedEventName = wantedEventName;
	}
	
	public String getWantedLocation() {
		return wantedLocation;
	}
	
	public void setWantedLocation(String wantedLocation) {
		this.wantedLocation = wantedLocation;
	}
	
	public LocalDate getWantedDate() {
		return wantedDate;
	}
	
	public void setWantedDate(LocalDate wantedDate) {
		this.wantedDate = wantedDate;
	}
	
	public Integer getWantedSeatNumber() {
		return wantedSeatNumber;
	}
	
	public void setWantedSeatNumber(Integer wantedSeatNumber) {
		this.wantedSeatNumber = wantedSeatNumber;
	}
	
	public String getWantedTicketType() {
		return wantedTicketType;
	}
	
	public void setWantedTicketType(String wantedTicketType) {
		this.wantedTicketType = wantedTicketType;
	}
    
}



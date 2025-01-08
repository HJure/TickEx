package progi_project.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "oglas")
@Inheritance(strategy = InheritanceType.JOINED)
public class Ticket{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idogl",nullable = false, unique = true)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "iddog", nullable = false)
    private Vrsta_Dogadaja eventTypeId;

    @Column(name="nazdog", nullable = false)
    private String eventName;

    @Column(name="datum", nullable = false)
    private LocalDate eventDate;

    @Column(name="mjesto", nullable = false)
    private String location;

    @Column(name="brsje", nullable = true)
    private Integer seatNumber;

    @Column(name="vrsula", nullable = true)
    private String ticketType;
    
    @Column(name="nazizv", nullable = true)
    private String artistName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idkor", nullable = false)
    private User owner;

    @Column(name = "status", nullable = false)
    private String isExchangeAvailable;
    
    @Column(name = "vrijemeobrisano", nullable = true)
    private LocalDateTime ObrisanoTime;
    
    //spajanje sa svida tablicom u bazi
    @ManyToMany(mappedBy = "favoriteTickets", cascade = CascadeType.PERSIST)
    private Set<User> users;

    public Set<User> getUsers(){
        return users;
    }
    public void setUsers(User u){
        users.add(u);
        //System.out.println("\n users in ticket's set " + users.toString() +"\n");
    }
    public int getId() {
        return id;
    }

    public LocalDateTime getObrisanoTime() {
		return ObrisanoTime;
	}

	public void setObrisanoTime(LocalDateTime obrisanoTime) {
		ObrisanoTime = obrisanoTime;
	}

	public void setId(int id) {
        this.id = id;
    }

    public Vrsta_Dogadaja getEventTypeId() {
        return eventTypeId;
    }

    public void setEventTypeId(Vrsta_Dogadaja eventType) {
        this.eventTypeId = eventType;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getisExchangeAvailable() {
        return isExchangeAvailable;
    }

    public void setExchangeAvailable(String exchangeAvailable) {
        isExchangeAvailable = exchangeAvailable;
    }

	public String getArtistName() {
		return artistName;
	}

	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}
    
    
}



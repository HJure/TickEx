package progi_project.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "oglas")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idogl",nullable = false, unique = true)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "iddog", nullable = false)
    private Vrsta_Dogadaja eventTypeId;

    @Column(name="cijena", nullable = false)
    private int price;

    @Column(name="nazdog", nullable = false)
    private String eventName;

    @Column(name="datum", nullable = false)
    private LocalDateTime eventDate;

    @Column(name="mjesto", nullable = false)
    private String location;

    @Column(name="brsje", nullable = true)
    private int seatNumber;

    @Column(name="vrsula", nullable = true)
    private String ticketType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idprodavac", nullable = false)
    private User owner;

    @Column(name = "status", nullable = false)
    private boolean isExchangeAvailable;


    public int getId() {
        return id;
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

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
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

    public boolean isExchangeAvailable() {
        return isExchangeAvailable;
    }

    public void setExchangeAvailable(boolean exchangeAvailable) {
        isExchangeAvailable = exchangeAvailable;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}



package progi_project.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "oglas")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idogl",nullable = false, unique = true)
    private int id;

    @Column(name="datum", nullable = false)
    private LocalDateTime eventDate;

    @Column(name="nazdog", nullable = false)
    private String eventName;

    @Column(name = "status", nullable = false)
    private boolean isExchangeAvailable;

    @Column(name="mjesto", nullable = false)
    private String location;

    @Column(name="cijena", nullable = false)
    private int price;

    @Column(name="brsje", nullable = true)
    private int seatNumber;

    @Column(name="vrsula", nullable = true)
    private String ticketType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "iddog", nullable = false)
    private Vrsta_Dogadaja eventTypeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idprodavac", nullable = false)
    private User owner;

    // Constructors

    public Ticket() {

    }
    public Ticket(LocalDateTime eventDate, String eventName, boolean isExchangeAvailable, String location, int price, int seatNumber, String ticketType, Vrsta_Dogadaja eventTypeId, User owner) {
        this.eventDate = eventDate;
        this.eventName = eventName;
        this.isExchangeAvailable = this.isExchangeAvailable;
        this.location = location;
        this.price = price;
        this.seatNumber = seatNumber;
        this.ticketType = ticketType;
        this.eventTypeId = eventTypeId;
        this.owner = owner;
    }


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



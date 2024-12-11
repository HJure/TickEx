package progi_project.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "oglas")
@Inheritance(strategy = InheritanceType.JOINED)
public class Ticket{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idogl",nullable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "iddog", nullable = false)
    private Vrsta_Dogadaja eventTypeId;

    @Column(name="nazdog", nullable = false)
    private String eventName;

    @Column(name="datum", nullable = false)
    private LocalDateTime eventDate;

    @Column(name="mjesto", nullable = false)
    private String location;

    @Column(name="brsje", nullable = true)
    private Integer seatNumber;

    @Column(name="vrsula", nullable = true)
    private String ticketType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idprodavac", nullable = false)
    private User owner;

    @Column(name = "status", nullable = false)
    private boolean isExchangeAvailable = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public boolean isExchangeAvailable() {
        return isExchangeAvailable;
    }

    public void setExchangeAvailable(boolean exchangeAvailable) {
        isExchangeAvailable = exchangeAvailable;
    }
}



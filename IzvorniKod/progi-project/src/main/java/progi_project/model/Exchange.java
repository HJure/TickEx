package progi_project.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "razmjena")
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "offerer_id")
    private User offerer; // The user who makes the offer

    @ManyToOne
    @JoinColumn(name = "offeree_id")
    private User offeree; // The user receiving the offer

    @ManyToOne
    @JoinColumn(name = "offer_ticket_id")
    private Ticket offerTicket; // Ticket being offered

    @ManyToOne
    @JoinColumn(name = "request_ticket_id")
    private Ticket requestTicket; // Ticket requested in exchange

    @Column(nullable = false)
    private LocalDateTime createdAt; // Timestamp for when the offer was created

    @Column(nullable = false)
    private LocalDateTime expirationDate; // Timestamp for when the offer expires

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getOfferer() {
        return offerer;
    }

    public void setOfferer(User offerer) {
        this.offerer = offerer;
    }

    public User getOfferee() {
        return offeree;
    }

    public void setOfferee(User offeree) {
        this.offeree = offeree;
    }

    public Ticket getOfferTicket() {
        return offerTicket;
    }

    public void setOfferTicket(Ticket offerTicket) {
        this.offerTicket = offerTicket;
    }

    public Ticket getRequestTicket() {
        return requestTicket;
    }

    public void setRequestTicket(Ticket requestTicket) {
        this.requestTicket = requestTicket;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
}



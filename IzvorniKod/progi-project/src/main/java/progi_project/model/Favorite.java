package progi_project.model;


import java.io.Serializable;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@IdClass(Favorite.FavoriteId.class)
@Table(name = "svida")
public class Favorite {
    
    
    @ManyToOne
    @JoinColumn(name = "idkor", referencedColumnName = "idkor", insertable = false, updatable = false)
    private User user;
    

    @ManyToOne
    @JoinColumn(name = "idogl", referencedColumnName = "idogl", insertable = false, updatable = false)
    private Ticket ticket;
    
    @Column(name= "status", nullable = true)
    private Boolean like;

    @Id
    private int idkor;  

    @Id
    private int idogl;  
   
    public Favorite() {}

    public Favorite(User user, Ticket ticket, Boolean like) {
        this.user = user;
        this.ticket = ticket;
        this.idkor = user.getId();
        this.idogl = ticket.getId();  
        this.like = like;
        
    }
    
    public Favorite(User user, Ticket ticket) {
        this.user = user;
        this.ticket = ticket;
        this.idkor = user.getId();
        this.idogl = ticket.getId();     
    }

    // Getters and Setters
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
        this.idkor = user.getId();
    }   
    public Ticket getTicket() {
        return ticket;
    }   
    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
        this.idogl = ticket.getId();   
    }
    
    public Boolean isLike() {
		return like;
	}

	public void setLike(Boolean like) {
		this.like = like;
	}

	@Embeddable
    public static class FavoriteId implements Serializable {

        private int idkor;
        private int idogl;

        // Default constructor
        public FavoriteId() {}

        // Constructor
        public FavoriteId(int idkor, int ticketId) {
            this.idkor = idkor;
            this.idkor = idkor;
        }

        // Getters and Setters
        public int getUserId() {
            return idkor;
        }

        public void setUserId(int userId) {
            this.idkor = userId;
        }

        public int getTicketId() {
            return idogl;
        }

        public void setTicketId(int idogl) {
            this.idogl = idogl;
        }

        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            FavoriteId that = (FavoriteId) o;
            return Objects.equals(idkor, that.idkor) && Objects.equals(idogl, that.idogl);
        }

        @Override
        public int hashCode() {
            return Objects.hash(idkor, idogl);
        }
        
    }
    public String toString() {
        return "Favorite{" +
                "user=" + user.toString() +
                ", ticket=" + ticket.toString() +
                '}';        
    }
}

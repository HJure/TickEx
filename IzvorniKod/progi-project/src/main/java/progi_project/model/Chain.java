package progi_project.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@IdClass(ChainId.class)
@Table(name = "sudjeluje")
public class Chain {

	@Id
    @Column(name ="idsudj",nullable = false, unique = true)
    private int idsudj;

	@Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idogl", nullable = false)
    private Ticket idogl;

	@Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idkor", nullable = false)
    private User idkor;
    
    public Chain() {
    }

	public Chain(User userId, Ticket ticketId) {
		this.idkor = userId;
		this.idogl = ticketId;
	}

	public int getId() {
		return idsudj;
	}

	public void setId(int id) {
		this.idsudj = id;
	}

	public Ticket getTicketId() {
		return idogl;
	}

	public void setTicketId(Ticket ticketId) {
		this.idogl = ticketId;
	}

	public User getUserId() {
		return idkor;
	}

	public void setUserId(User userId) {
		this.idkor = userId;
	}
    
    
}

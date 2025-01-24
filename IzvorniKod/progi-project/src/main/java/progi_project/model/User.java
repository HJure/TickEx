package progi_project.model;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "korisnik")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idkor",nullable = false, unique = true)
    private int id;

    @Column(name ="email",nullable = false, unique = true)
    private String email;

    @Column(name ="imekor",nullable = false)
    private String imeKor;

    @Column(name ="prezkor",nullable = false)
    private String prezimeKor;

    @Column(name ="datumula",nullable = false)
    private LocalDate datumUla;

    @Column(name ="statuskor",nullable = false)
    private Boolean statusKor;
    
    @Column(name ="admin",nullable = false)
    private Boolean admin;

    @Column(name ="ocjena",nullable = false)
    private float ocjena;


    //Temporary default constructor
    public User() { 
 
    } 

    public User(String email, String imeKor, String prezimeKor, LocalDate datumUla) {
        this.email = email;
        this.imeKor = imeKor;
        this.prezimeKor = prezimeKor;
        this.datumUla = datumUla;
        this.statusKor = true;
        this.ocjena = 0.0f;
        
    }

    public User(String email, String imeKor, String prezimeKor, LocalDate datumUla, boolean statusKor, float ocjena) {
        this.email = email;
        this.imeKor = imeKor;
        this.prezimeKor = prezimeKor;
        this.datumUla = datumUla;
        this.statusKor = statusKor;
        this.ocjena = ocjena;
    }
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImeKor() {
        return imeKor;
    }

    public void setImeKor(String imeKor) {
        this.imeKor = imeKor;
    }

    public String getPrezimeKor() {
        return prezimeKor;
    }

    public void setPrezimeKor(String prezimeKor) {
        this.prezimeKor = prezimeKor;
    }

    public LocalDate getDatumUla() {
        return datumUla;
    }

    public void setDatumUla(LocalDate datumUla) {
        this.datumUla = datumUla;
    }

    public Boolean isStatusKor() {
        return statusKor;
    }

    public void setStatusKor(Boolean statusKor) {
        this.statusKor = statusKor;
    }

    public float getOcjena() {
        return ocjena;
    }

    public void setOcjena(float ocjena) {
        this.ocjena = ocjena;
    }
    
    public Boolean getAdmin() {
		return admin;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	@Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", email='" + email + '\'' +
            ", imeKor='" + imeKor + '\'' +
            ", prezimeKor='" + prezimeKor + '\'' +
            ", datumUla=" + datumUla +
            ", statusKor=" + statusKor +
            ", ocjena=" + ocjena +
            '}';
}

}


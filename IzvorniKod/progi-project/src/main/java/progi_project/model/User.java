package progi_project.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
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

    @Column(name ="prezimekor",nullable = false)
    private String prezimeKor;

    @Column(name ="datumula",nullable = false)
    private LocalDate datumUla;

    @Column(name ="statusKor",nullable = false)
    private boolean statusKor;

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

    public boolean isStatusKor() {
        return statusKor;
    }

    public void setStatusKor(boolean statusKor) {
        this.statusKor = statusKor;
    }

    public float getOcjena() {
        return ocjena;
    }

    public void setOcjena(float ocjena) {
        this.ocjena = ocjena;
    }
}


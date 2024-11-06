package progi_project.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "korisnik")
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
    private String prezimekor;

    @Column(name ="datumula",nullable = false)
    private LocalDate datumUla = LocalDate.now();

    // Constructor
    public User(String email) {
        this.email = email;
    }

    //Temporary default constructor
    public User() { 
 
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

    public String getPrezimekor() {
        return prezimekor;
    }

    public void setPrezimekor(String prezimekor) {
        this.prezimekor = prezimekor;
    }

    public LocalDate getDatumUla() {
        return datumUla;
    }

    public void setDatumUla(LocalDate datumUla) {
        this.datumUla = datumUla;
    }
}


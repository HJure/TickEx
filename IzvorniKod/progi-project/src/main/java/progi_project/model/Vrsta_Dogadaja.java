package progi_project.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "vrsta_dogadaja")
public class Vrsta_Dogadaja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="iddog",nullable = false, unique = true)
    private int id;


    @Column(name ="nazvrdog",nullable = false)
    private String nazVrDog;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNazVrDog() {
        return nazVrDog;
    }

    public void setNazVrDog(String nazVrDog) {
        this.nazVrDog = nazVrDog;
    }
}

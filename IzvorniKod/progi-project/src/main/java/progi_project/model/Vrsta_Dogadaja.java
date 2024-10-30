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

    @OneToMany(mappedBy = "eventTypeId", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Ticket> tickets;

    @Column(name ="nazvrsdog",nullable = false, unique = true)
    private String nazVrDog;
}

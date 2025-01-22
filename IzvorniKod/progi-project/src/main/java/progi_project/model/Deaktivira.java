package progi_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "deaktivira")
@IdClass(DeaktiviraId.class)
public class Deaktivira {

    @Id
    @Column(name = "deaktiviraidkor")
    private int deaktiviraIdKor;

    @Id
    @Column(name = "deaktiviranidkor")
    private int deaktiviranIdKor;

    // Getters and Setters
    public int getDeaktiviraIdKor() {
        return deaktiviraIdKor;
    }

    public void setDeaktiviraIdKor(int deaktiviraIdKor) {
        this.deaktiviraIdKor = deaktiviraIdKor;
    }

    public int getDeaktiviranIdKor() {
        return deaktiviranIdKor;
    }

    public void setDeaktiviranIdKor(int deaktiviranIdKor) {
        this.deaktiviranIdKor = deaktiviranIdKor;
    }
}


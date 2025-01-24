package progi_project.model;

import java.io.Serializable;
import java.util.Objects;

public class DeaktiviraId implements Serializable {
    private int deaktiviraIdKor;
    private int deaktiviranIdKor;

    // Default constructor
    public DeaktiviraId() {}

    // Constructor
    public DeaktiviraId(int deaktiviraIdKor, int deaktiviranIdKor) {
        this.deaktiviraIdKor = deaktiviraIdKor;
        this.deaktiviranIdKor = deaktiviranIdKor;
    }

    // Getters and setters
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

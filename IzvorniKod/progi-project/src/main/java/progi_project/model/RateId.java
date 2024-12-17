package progi_project.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class RateId implements Serializable {
    @Column(name = "ocjenjujeidkor")
    private int ocjenjujeidkor;

    @Column(name = "ocijenjenidkor")
    private int ocijenjenidkor;

    public RateId() {}

    public RateId(int ocjenjujeIdKor, int ocijenjenIdKor) {
        this.ocjenjujeidkor = ocjenjujeIdKor;
        this.ocijenjenidkor = ocijenjenIdKor;
    }

    public int getOcjenjujeIdKor() {
        return ocjenjujeidkor;
    }

    public void setOcjenjujeIdKor(int ocjenjujeIdKor) {
        this.ocjenjujeidkor = ocjenjujeIdKor;
    }

    public int getOcijenjenIdKor() {
        return ocijenjenidkor;
    }

    public void setOcijenjenIdKor(int ocijenjenIdKor) {
        this.ocijenjenidkor = ocijenjenIdKor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RateId rateId = (RateId) o;
        return ocjenjujeidkor == rateId.ocjenjujeidkor && ocijenjenidkor == rateId.ocijenjenidkor;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ocjenjujeidkor, ocijenjenidkor);
    }
}

package progi_project.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class RateId implements Serializable {
    private int ocjenjujeIdKor;
    private int ocijenjenIdKor;

    public RateId() {}

    public RateId(int ocjenjujeIdKor, int ocijenjenIdKor) {
        this.ocjenjujeIdKor = ocjenjujeIdKor;
        this.ocijenjenIdKor = ocijenjenIdKor;
    }

    public int getOcjenjujeIdKor() {
        return ocjenjujeIdKor;
    }

    public void setOcjenjujeIdKor(int ocjenjujeIdKor) {
        this.ocjenjujeIdKor = ocjenjujeIdKor;
    }

    public int getOcijenjenIdKor() {
        return ocijenjenIdKor;
    }

    public void setOcijenjenIdKor(int ocijenjenIdKor) {
        this.ocijenjenIdKor = ocijenjenIdKor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RateId rateId = (RateId) o;
        return ocjenjujeIdKor == rateId.ocjenjujeIdKor && ocijenjenIdKor == rateId.ocijenjenIdKor;
    }

    @Override
    public int hashCode() {
        return 613 * ocjenjujeIdKor + ocijenjenIdKor;
    }
}

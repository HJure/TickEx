package progi_project.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class ChainId implements Serializable {
    
    private int idsudj;  
    private int idkor;   
    private int idogl;   

    public ChainId() {
    }

    public ChainId(int idsudj, int idkor, int idogl) {
        this.idsudj = idsudj;
        this.idkor = idkor;
        this.idogl = idogl;
    }

    public int getIdSudj() {
        return idsudj;
    }

    public void setIdSudj(int idSudj) {
        this.idsudj = idSudj;
    }

    public int getIdKor() {
        return idkor;
    }

    public void setIdKor(int idKor) {
        this.idkor = idKor;
    }

    public int getIdOgl() {
        return idogl;
    }

    public void setIdOgl(int idOgl) {
        this.idogl = idOgl;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ChainId chainId = (ChainId) obj;
        return idsudj == chainId.idsudj && idkor == chainId.idkor && idogl == chainId.idogl;
    }

    
    @Override
    public int hashCode() {
        return 31 * (31 * idsudj + idkor ) + idogl;
    }
}

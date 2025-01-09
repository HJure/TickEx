package progi_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "sudjeluje")
public class Chain {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idsudj",nullable = false, unique = true)
    private int idsudj;

    @Column(name = "idogl", nullable = false)
    private Integer[] idogl;

    @Column(name = "idkor", nullable = false)
    private Integer[] idkor;
    
    @Column(name = "odgovor", nullable = true)
    private Boolean[] response;
    
    public Chain() {
    }

    
	public Chain(Integer[] idogl, Integer[] idkor, int broj) {
		this.idogl = idogl;
		this.idkor = idkor;
		this.response = new Boolean[broj];
	}
	
	public int getIdsudj() {
		return idsudj;
	}

	public void setIdsudj(int idsudj) {
		this.idsudj = idsudj;
	}


	public Integer[] getIdogl() {
		return idogl;
	}


	public void setIdogl(Integer[] idogl) {
		this.idogl = idogl;
	}


	public Integer[] getIdkor() {
		return idkor;
	}


	public void setIdkor(Integer[] idkor) {
		this.idkor = idkor;
	}

	public Boolean[] getResponse() {
		return response;
	}


	public void setResponse(Boolean[] response) {
		this.response = response;
	}
	
}

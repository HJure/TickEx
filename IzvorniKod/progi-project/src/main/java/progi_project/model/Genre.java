package progi_project.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@IdClass(Genre.GenreId.class)
@Table(name = "zainteresiran")
public class Genre {

    
    
    @ManyToOne
    @JoinColumn(name = "idkor", referencedColumnName = "idkor", insertable = false, updatable = false)
    private User user;
    

    @ManyToOne
    @JoinColumn(name = "iddog", referencedColumnName = "iddog", insertable = false, updatable = false)
    private Vrsta_Dogadaja genre;

    @Id
    private int idkor;  

    @Id
    private int iddog;  
   
    public Genre() {}

    public Genre(User user, Vrsta_Dogadaja genre) {
        this.user = user;
        this.genre = genre;
        this.idkor = user.getId();
        this.iddog = genre.getId();   
        
    }

    // Getters and Setters
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
        this.idkor = user.getId();
    }   
    public Vrsta_Dogadaja getGenre() {
        return genre;
    }   
    public void setGenre(Vrsta_Dogadaja genre) {
        this.genre = genre;
        this.iddog = genre.getId();   
    }

    @Embeddable
    public static class GenreId implements Serializable {

        private int idkor;
        private int iddog;

        
        public GenreId() {}

        
        public GenreId(int idkor, int iddog) {
            this.idkor = idkor;
            this.iddog = iddog;
        }

        // Getters and Setters
        public int getUserId() {
            return idkor;
        }

        public void setUserId(int userId) {
            this.idkor = userId;
        }

        public int getGenreId() {
            return iddog;
        }

        public void setGenreId(int iddog) {
            this.iddog = iddog;
        }

        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            GenreId that = (GenreId) o;
            return Objects.equals(idkor, that.idkor) && Objects.equals(iddog, that.iddog);
        }

        @Override
        public int hashCode() {
            return Objects.hash(idkor, iddog);
        }
        
    }
   
}



package progi_project.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import progi_project.model.Genre;
import progi_project.model.User;
import progi_project.model.Vrsta_Dogadaja;
import progi_project.repository.FavoriteRepository;
import progi_project.repository.UserRepository;
import progi_project.repository.Vrsta_DogadajaRepository;
import progi_project.repository.GenreRepository;

@Service
public class GenreService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private Vrsta_DogadajaRepository vrsta_DogadajaRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GenreRepository genreRepository;
    

    public Genre addGenre(String userMail, int genreId) {
        User user = userRepository.findByEmail(userMail).get();
        Vrsta_Dogadaja vrsta_Dogadaja = vrsta_DogadajaRepository.findById(genreId).get();
        
        Genre genre = new Genre(user, vrsta_Dogadaja);
        
        return genreRepository.save(genre);
    } 
    public void addGenres(List<String> categories, String userMail) {
        List<Vrsta_Dogadaja> Vrste_Dogadaja = vrsta_DogadajaRepository.findAll(); 
        List<String> legal_categories = new ArrayList<String>();

        // Nabavi sve vrste događaje koje postoje
        for (Vrsta_Dogadaja vrsta_Dogadaja : Vrste_Dogadaja) {
            legal_categories.add(vrsta_Dogadaja.getNazVrDog());
        }
        for (String category : categories) {
            
                if(legal_categories.contains(category)){
                    
                    addGenre(userMail, vrsta_DogadajaRepository.findIdByName(category));
                }
          
        }
       
        
    }
   
    public void removeGenre(int idkor, int genreId) {
        
        genreRepository.deleteByIdkorAndIddog(idkor, genreId);
    }
	
    public List<Genre> findByidkor(int idkor){
    	return genreRepository.findByidkor(idkor);
    }

    
    
}

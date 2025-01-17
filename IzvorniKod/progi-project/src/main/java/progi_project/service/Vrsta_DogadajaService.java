package progi_project.service;

import org.springframework.stereotype.Service;
import progi_project.model.Vrsta_Dogadaja;
import progi_project.repository.Vrsta_DogadajaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class Vrsta_DogadajaService {

    private final Vrsta_DogadajaRepository vrstaDogadajaRepository;

    public Vrsta_DogadajaService(Vrsta_DogadajaRepository vrstaDogadajaRepository) {
        this.vrstaDogadajaRepository = vrstaDogadajaRepository;
    }

    public List<Vrsta_Dogadaja> findAll() {
        return vrstaDogadajaRepository.findAll();
    }

    public Optional<Vrsta_Dogadaja> findById(int id) {
        return vrstaDogadajaRepository.findById(id);
    }

    public Vrsta_Dogadaja save(Vrsta_Dogadaja vrstaDogadaja) {
        return vrstaDogadajaRepository.save(vrstaDogadaja);
    }

    public void deleteById(int id) {
        vrstaDogadajaRepository.deleteById(id);
    }
    
}

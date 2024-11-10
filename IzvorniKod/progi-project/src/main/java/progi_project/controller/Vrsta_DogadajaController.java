package progi_project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi_project.model.Vrsta_Dogadaja;
import progi_project.service.Vrsta_DogadajaService;

import java.util.List;

@RestController
@RequestMapping("/api/vrsta-dogadaja")
public class Vrsta_DogadajaController {

    private final Vrsta_DogadajaService vrstaDogadajaService;

    public Vrsta_DogadajaController(Vrsta_DogadajaService vrstaDogadajaService) {
        this.vrstaDogadajaService = vrstaDogadajaService;
    }


    @GetMapping
    public ResponseEntity<List<Vrsta_Dogadaja>> getAll() {
        List<Vrsta_Dogadaja> listaVrstaDogadaja = vrstaDogadajaService.findAll();
        return new ResponseEntity<>(listaVrstaDogadaja, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vrsta_Dogadaja> getById(@PathVariable int id) {
        return vrstaDogadajaService.findById(id)
                .map(vrstaDogadaja -> new ResponseEntity<>(vrstaDogadaja, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Vrsta_Dogadaja> create(@RequestBody Vrsta_Dogadaja vrstaDogadaja) {
        Vrsta_Dogadaja savedVrstaDogadaja = vrstaDogadajaService.save(vrstaDogadaja);
        return new ResponseEntity<>(savedVrstaDogadaja, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        vrstaDogadajaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

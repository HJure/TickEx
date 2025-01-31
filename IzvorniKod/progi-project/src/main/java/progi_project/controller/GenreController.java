package progi_project.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Genre;
import progi_project.service.GenreService;

@RestController
@RequestMapping("/savePreferences")
public class GenreController {
    @Autowired
    private GenreService genreService;
    
    
   @PostMapping
public ResponseEntity<Object> addGenres(@RequestBody List<String> categories, @RequestParam String email) {
    System.out.println("Received categories: " + categories); 

    if (email == null || email.isEmpty()) {
        return ResponseEntity.badRequest().body("Email is required.");
    }

    if (categories == null || categories.isEmpty()) {
        System.out.println("Empty categories list received.");
        return ResponseEntity.ok(new HashMap<>()); 
    }

    System.out.println("Received email: " + email);
    try {
        genreService.addGenres(categories, email);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error saving preferences: " + e.getMessage());
    }

    return ResponseEntity.ok("Preferences saved successfully");
}

@PutMapping
public ResponseEntity<Object> updatePreferences(@RequestBody List<String> categories, @RequestParam String email) {

    if (email == null || email.isEmpty()) {
        return ResponseEntity.badRequest().body("Email is required.");
    }
    if (categories == null || categories.isEmpty()) {
        System.out.println("Empty categories list received.");
        return ResponseEntity.ok(new HashMap<>()); 
    }

    try {
        genreService.updateGenres(categories, email);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error updating preferences: " + e.getMessage());
    }
    return ResponseEntity.ok("Preferences updated successfully");
}

    
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Genre>> getGenresByUserId(@PathVariable int id) {
        try {
            List<Genre> genres = genreService.findByidkor(id);
            return ResponseEntity.ok(genres);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

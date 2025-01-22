package progi_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi_project.model.Deaktivira;
import progi_project.model.DeaktiviraRequest;
import progi_project.model.User;
import progi_project.service.DeaktiviraService;
import progi_project.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/deaktivira")
public class DeaktiviraController {

    @Autowired
    private DeaktiviraService deaktiviraService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> createDeaktivira(@RequestBody DeaktiviraRequest request) {
    	User korisnik = userService.findById(request.getDeaktiviranIdKor());
    	korisnik.setStatusKor(false);
        try {
            deaktiviraService.createDeaktivira(request.getDeaktiviraIdKor(), request.getDeaktiviranIdKor());
            return ResponseEntity.ok("Deactivation record created successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/user-deactivated")
    public ResponseEntity<List<Deaktivira>> getDeactivationsForUser(@RequestParam int deaktiviranIdKor) {
        List<Deaktivira> deactivations = deaktiviraService.getDeactivationsForUser(deaktiviranIdKor);
        return ResponseEntity.ok(deactivations);
    }

    @GetMapping("/user-deactivator")
    public ResponseEntity<List<Deaktivira>> getDeactivationsByUser(@RequestParam int deaktiviraIdKor) {
        List<Deaktivira> deactivations = deaktiviraService.getDeactivationsByUser(deaktiviraIdKor);
        return ResponseEntity.ok(deactivations);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> deleteDeactivationsForUser(@PathVariable int userId) {
    	User korisnik = userService.findById(userId);
    	korisnik.setStatusKor(true);
        try {
            deaktiviraService.deleteDeactivationsForUser(userId);
            return ResponseEntity.ok("Deactivation records deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/is-deactivated/{userId}")
    public ResponseEntity<Boolean> isUserDeactivated(@PathVariable int userId) {
        boolean isDeactivated = deaktiviraService.isUserDeactivated(userId);
        return ResponseEntity.ok(isDeactivated);
    }


}


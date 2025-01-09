package progi_project.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Chain;
import progi_project.repository.ChainRepository;

@RestController
@RequestMapping("/chain")
public class ChainController {
	
	@Autowired
    private ChainRepository chainRepository;
	
	@GetMapping
	public List<Chain> getAllChains() {
	   return chainRepository.findAll();
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<?> findChainsUser(@PathVariable Integer id) {
        List<Chain> chains = chainRepository.findChainsByUserId(id);

        if (!chains.isEmpty()) {
            return ResponseEntity.ok(chains);
        } else {
            return ResponseEntity.status(404).body("User with ID " + id + " not found in any chains.");
        }
    }
}

package progi_project.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Chain;
import progi_project.service.ChainService;

@RestController
@RequestMapping("/chain")
public class ChainController {
	
	@Autowired
    private ChainService chainService;
	
	@Value("${chain.minutes}")
    private long chainMinutes;
	
	@GetMapping
	public List<Chain> getAllChains() {
	   return chainService.findAll();
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<?> findChainsUser(@PathVariable Integer id) {
        List<Chain> chains = chainService.findChainsByUserId(id);

        if (!chains.isEmpty()) {
            return ResponseEntity.ok(chains);
        } else {
            return ResponseEntity.status(404).body("User with ID " + id + " not found in any chains.");
        }
    }
	
	@PostMapping("/{id}/updateResponse")
	public ResponseEntity<Void> updateChainResponse(@PathVariable int id, @RequestBody Map<String, Object> request) {
	    Chain chain = chainService.findById(id);
	    int userIndex = (int) request.get("userIndex");
	    Boolean responseStatus = (Boolean) request.get("response");
	    
	    Boolean[] updatedResponse = chain.getResponse();
	    if (userIndex >= 0 && userIndex < updatedResponse.length) {
	        updatedResponse[userIndex] = responseStatus;
	        chain.setResponse(updatedResponse);
	    } else {
	        return ResponseEntity.badRequest().build();
	    }

	    chainService.save(chain);

	    return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/{chainId}/checkCompletion")
    public ResponseEntity<String> checkChainCompletion(@PathVariable int chainId) {
        boolean allTrue = chainService.areAllResponsesTrue(chainId);
        boolean allFalse = chainService.areAllResponsesFalse(chainId);

        if (allTrue) {
            return ResponseEntity.ok("Uspješno obavljena razmjena");
        } else if (allFalse) {
            return ResponseEntity.ok("Neuspješno obavljena razmjena");
        } else {
            return ResponseEntity.ok("Razmjena nije završena");
        }
    }
	
	@PostMapping("/checkExpiration")
	public ResponseEntity<List<Chain>> checkChainExpiration(@RequestBody Map<String, Integer> request) {
		Integer userId = request.get("userId");
		List<Chain> chains = chainService.findChainsByUserId(userId);
		
		System.out.println(userId);
	    chains.forEach(chain -> {
	        LocalDateTime timeOfMaking = chain.getTimeOfMaking();
	        LocalDateTime expirationTime = timeOfMaking.plusMinutes(chainMinutes);

	        //ako su svi prihvatili onda ne može isteći
	        if(chainService.areAllResponsesTrue(chain.getId())){
	        	
	        }else if (LocalDateTime.now().isAfter(expirationTime)) {
	            chainService.updateAllResponses(chain.getId());
	        }
	    });

	    return ResponseEntity.ok(chains);
	}
}

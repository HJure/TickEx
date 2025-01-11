package progi_project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Exchange;
import progi_project.service.ExchangeService;

@RestController
@RequestMapping("/exchanges")
public class ExchangeController {

	@Autowired
    private ExchangeService exchangeService;
	
	@GetMapping
    public List<Exchange> getAllExchanges() {
		return exchangeService.findAll()
                .stream()
                .filter(exchange -> !"isteklo".equals(exchange.getisExchangeAvailable()))
                .collect(Collectors.toList());
		//da se ne vracaju istekle zamjene
    }
	
	@PostMapping("/{id}/process")
    public ResponseEntity<String> processExchange(@PathVariable Integer id) {
        boolean success = exchangeService.processExchangeChain(id);
        if (success) {
            return ResponseEntity.ok("Exchange chain successfully processed!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No valid exchange chain found.");
        }
    }
	 
	@PostMapping
	public void createExchange(@RequestBody Exchange exchange) {
	   exchangeService.save(exchange);
	} 
	 
	 
}

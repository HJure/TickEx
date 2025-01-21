package progi_project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
            return ResponseEntity.ok("Uspješno pronađen lanac zamjene!");
        } else {
            // ako lanac nije pronađen, vratiti poruku "Nema lanaca"
            return ResponseEntity.status(HttpStatus.OK).body("Nema lanaca");
        }
    }

    @PostMapping
    public ResponseEntity<Integer> createExchange(@RequestBody Exchange exchange) {
        Exchange savedExchange = exchangeService.save(exchange);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExchange.getId());
    }
	
    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateExchange(@PathVariable Long id, @RequestBody Exchange exchange) {
        Exchange updatedExchange = exchangeService.updateExchange(id, exchange);
        return ResponseEntity.ok(updatedExchange.getId());
    }
    
}

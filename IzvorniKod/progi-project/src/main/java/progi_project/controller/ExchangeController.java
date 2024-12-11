package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PostMapping
    public Exchange createExchange(@RequestBody Exchange exchange) {
        return exchangeService.createExchange(exchange);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exchange> getExchangeById(@PathVariable Long id) {
        return exchangeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Exchange> getAllExchanges() {
        return exchangeService.getAllExchanges();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exchange> updateExchange(@PathVariable Long id, @RequestBody Exchange exchange) {
        exchange.setId(id);
        Exchange updatedExchange = exchangeService.updateExchange(exchange);
        return ResponseEntity.ok(updatedExchange);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExchange(@PathVariable Long id) {
        exchangeService.deleteExchange(id);
        return ResponseEntity.noContent().build();
    }
}

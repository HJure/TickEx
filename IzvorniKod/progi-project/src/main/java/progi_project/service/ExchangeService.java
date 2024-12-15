package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Exchange;
import progi_project.repository.ExchangeRepository;

@Service
public class ExchangeService {

    @Autowired
    private ExchangeRepository exchangeRepository;

    public Exchange createExchange(Exchange exchange) {
        return exchangeRepository.save(exchange);
    }

    public Optional<Exchange> findById(Long id) {
        return exchangeRepository.findById(id);
    }

    public List<Exchange> getAllExchanges() {
        return exchangeRepository.findAll();
    }

    public Exchange updateExchange(Exchange exchange) {
        return exchangeRepository.save(exchange);
    }

    public void deleteExchange(Long id) {
        exchangeRepository.deleteById(id);
    }
}

package progi_project.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Chain;
import progi_project.model.Exchange;
import progi_project.repository.ChainRepository;
import progi_project.repository.ExchangeRepository;

@Service
public class ExchangeService {

    @Autowired
    private ExchangeRepository exchangeRepository;

    @Autowired
    private ChainRepository chainRepository;
    
    public boolean processExchangeChain(Integer id) {
        Exchange startExchange = exchangeRepository.findById(id);

        if (startExchange == null) {
            return false; // Ne postoji razmjena s tim ID-em
        }

        Set<Integer> visitedExchanges = new HashSet<>();
        List<Exchange> chain = new ArrayList<>();
        
        boolean isValid = findExchangeChain(startExchange, startExchange, visitedExchanges, chain);

        if (isValid) {
            Integer[] idOgl = new Integer[chain.size() - 1];
            Integer[] idKor = new Integer[chain.size() - 1];
            for(int i = 0; i < chain.size() - 1; i++) {
                idOgl[i] = chain.get(i).getId();
                idKor[i] = chain.get(i).getOwner().getId();
            }

            Chain lanac = new Chain(idOgl, idKor, chain.size() - 1);
            chainRepository.save(lanac);
        }

        return isValid;
    }
    
    private boolean findExchangeChain(Exchange current, Exchange startExchange, Set<Integer> visited, List<Exchange> chain) {
        chain.add(current);
        visited.add(current.getId());
        
        List<Exchange> matches = exchangeRepository.findMatches(
                current.getWantedEventName(),
                current.getWantedLocation(),
                current.getWantedDate(),
                current.getWantedSeatNumber(),
                current.getWantedTicketType()
        );

        for (Exchange match : matches) {
            if (match.getId() == startExchange.getId()) {
                chain.add(startExchange);
                return true;
            }

            if (!visited.contains(match.getId())) {
                if (findExchangeChain(match, startExchange, visited, chain)) {
                    return true;
                }
            }
        }

        // backtracking
        chain.remove(chain.size() - 1);
        visited.remove(current.getId());
        return false;
    }
   
    
    public List<Exchange> findAll(){
    	return exchangeRepository.findAll();
    }


	public Exchange save(Exchange exchange) {
		return exchangeRepository.save(exchange);
	}
}

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
     
        Set<Integer> visitedExchanges = new HashSet<>();
        List<Exchange> chain = new ArrayList<>();
        
        boolean isValid = findExchangeChain(startExchange, startExchange, visitedExchanges, chain);

        if (isValid) {
            
            Chain firstChain = new Chain(chain.get(0).getOwner(), chain.get(0));
            chainRepository.save(firstChain);

            //da su svi pod istim id-em
            int sharedIdSudj = firstChain.getId();
           
            for (int i = 1; i < chain.size() - 1; i++) {
                Chain newChain = new Chain(chain.get(i).getOwner(), chain.get(i));
                newChain.setId(sharedIdSudj);  
                chainRepository.save(newChain);
            }
        }

        return isValid;
    }

    
    private boolean findExchangeChain(Exchange current, Exchange startExchange, Set<Integer> visited, List<Exchange> chain) {
        chain.add(current);
        visited.add(current.getId());
        
        List<Exchange> matches = exchangeRepository.findMatches(
                current.getWantedEventName(),
                current.getWantedLocation()
               ,current.getWantedDate()
               ,current.getWantedSeatNumber()
               ,current.getWantedTicketType()
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

        //backtracking
        chain.remove(chain.size() - 1);
        visited.remove(current.getId());
        return false;
    }
    
    public List<Exchange> findAll(){
    	return exchangeRepository.findAll();
    }


	public void save(Exchange exchange) {
		exchangeRepository.save(exchange);
	}
}

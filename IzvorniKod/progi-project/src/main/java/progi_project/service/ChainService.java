package progi_project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Chain;
import progi_project.model.Ticket;
import progi_project.repository.ChainRepository;
import progi_project.repository.TicketRepository;

@Service
public class ChainService {
	
	@Autowired
    private ChainRepository chainRepository;
	
	@Autowired
    private TicketRepository ticketRepository;


	public List<Chain> findAll() {
		return chainRepository.findAll();
	}

	public void save(Chain chain) {
		chainRepository.save(chain);
	}

	public List<Chain> findChainsByUserId(Integer id) {
		return chainRepository.findChainsByUserId(id);
	}

	public Chain findById(int id) {
		return chainRepository.findById(id);
	}
	
	public boolean areAllResponsesTrue(int chainId) {
		Chain chain = chainRepository.getResponsesByChainId(chainId);
		Boolean[] responses = chain.getResponse();
		for(int i = 0;i < responses.length;i++) {
			if(responses[i] == null) {
    			return false;
    		}
			if(!responses[i].equals(true)) {
				return false;
			}
		}
		//svi su prihvatili, promijeni status na prodano
		for(int i = 0;i < responses.length;i++) {
			int idOgl = chain.getIdogl()[i];
			Ticket ulaznica = ticketRepository.findById(idOgl);
			ulaznica.setExchangeAvailable("prodano");
		}
		return true;
    }

    public boolean areAllResponsesFalse(int chainId) {
    	Chain chain = chainRepository.getResponsesByChainId(chainId);
		Boolean[] responses = chain.getResponse();
    	for(int i = 0;i < responses.length;i++) {
    		if(responses[i] == null) {
    			return false;
    		}
			if(!responses[i].equals(false)) {
				return false;
			}
		}
		return true;
    }

	public void updateAllResponses(int chainId) {
		chainRepository.updateAllResponses(chainId);
	}
}

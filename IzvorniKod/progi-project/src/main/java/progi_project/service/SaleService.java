package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Sale;
import progi_project.model.User;
import progi_project.repository.SaleRepository;
import progi_project.repository.UserRepository;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private UserRepository userRepository;

    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    // When customer buy ticket customerID and sale object are passed
    // Find that sale in db and update buyer from null to customerID
    public Sale updateSale(Sale sale, int id) {
        Optional<Sale> optionalSale = saleRepository.findById(sale.getId());
        if (optionalSale.isEmpty()) {
            return null;
        }
        Sale existingSale = optionalSale.get();
        User buyer = userRepository.findById(id);
        existingSale.setBuyer(buyer);
        return saleRepository.save(existingSale);
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }

	public void save(Sale sale) {
		saleRepository.save(sale);	
	}
}

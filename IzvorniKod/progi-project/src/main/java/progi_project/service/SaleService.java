package progi_project.service;

import java.util.List;

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

    public Sale findById(int id) {
        return saleRepository.findById(id);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    // When customer buy ticket customerID and sale object are passed
    // Find that sale in db and update buyer from null to customerID
    public Sale updateSale(int id, Sale sale) {
        Sale existingSale = saleRepository.findById(sale.getId());
        User buyer = userRepository.findById(id);

        existingSale.setBuyer(buyer); 

        return saleRepository.save(existingSale);
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }
}

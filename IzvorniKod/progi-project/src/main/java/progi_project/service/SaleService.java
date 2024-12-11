package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi_project.model.Sale;
import progi_project.repository.SaleRepository;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleRepository.findById(id);
    }

    public Sale updateSale(Long id, Sale updatedSale) {
        if (saleRepository.existsById(id)) {
            updatedSale.setId(id);
            return saleRepository.save(updatedSale);
        }
        return null;
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }
}

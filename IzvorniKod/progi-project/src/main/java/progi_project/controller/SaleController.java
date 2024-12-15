package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Sale;
import progi_project.service.SaleService;

@RestController
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PutMapping("/shop/sale/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable int id, @RequestBody Sale sale) {
        Sale updatedSale = saleService.updateSale(id, sale);
        return ResponseEntity.ok(updatedSale);
    }

    @GetMapping("/sales/{id}")
    public Sale getSaleById(@PathVariable int id) {
        return saleService.findById(id);
    }

    @GetMapping("/sales")
    public List<Sale> getPurchasedTickets() {
        return saleService.getAllSales();
    }
    
}

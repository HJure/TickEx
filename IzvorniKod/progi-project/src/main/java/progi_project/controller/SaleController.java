package progi_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Exchange;
import progi_project.model.Sale;

@RestController
@RequestMapping("/shop")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody Sale sale) {
        sale.setIdOgl(id);
        Sale updatedSale = saleService.updateSale(sale);
        return ResponseEntity.ok(updatedSale);
    }
    
}

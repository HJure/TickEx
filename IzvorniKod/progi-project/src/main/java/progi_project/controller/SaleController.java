package progi_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Sale;
import progi_project.service.SaleService;

@RestController
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping("/sales")
    public List<Sale> getPurchasedTickets() {
        return saleService.getAllSales();
    }
    
}

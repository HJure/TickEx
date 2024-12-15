package progi_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi_project.model.Sale;
import progi_project.service.SaleService;

@RestController
@RequestMapping("/shop")
public class ShopController {
    
    @Autowired
    private SaleService saleService;

    @PostMapping("/{id}")
    public Sale createExchange(@RequestBody Sale sale, @PathVariable int id) {
        return saleService.updateSale(sale, id);
    } 
    
}

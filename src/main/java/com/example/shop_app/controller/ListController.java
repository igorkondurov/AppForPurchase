package com.example.shop_app.controller;

import com.example.shop_app.domain.Purchase;
import com.example.shop_app.repo.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("list_view")
public class ListController {
    private PurchaseRepo purchaseRepo;

    @Autowired
    public ListController(PurchaseRepo purchaseRepo) {
        this.purchaseRepo = purchaseRepo;
    }

    @GetMapping
    public List<Purchase> getActualList(Purchase purchase) {
        return purchaseRepo.findAllActualPurchase();
    }
}

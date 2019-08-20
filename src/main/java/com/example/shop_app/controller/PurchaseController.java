package com.example.shop_app.controller;

import com.example.shop_app.domain.Purchase;
import com.example.shop_app.repo.PurchaseRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("buy")
public class PurchaseController {
    private final PurchaseRepo purchaseRepo;

    @Autowired
    public PurchaseController(PurchaseRepo purchaseRepo) {
        this.purchaseRepo = purchaseRepo;
    }

    @GetMapping
    public List<Purchase> list() {
        return purchaseRepo.findAll();
    }

    @GetMapping("{id}")
    public Purchase getOne(@PathVariable("id") Purchase purchase) {
        return purchase;
    }

    @PostMapping
    public Purchase create(@RequestBody Purchase purchase) {
        return purchaseRepo.save(purchase);
    }

    @PutMapping("{id}")
    public Purchase update(
            @PathVariable("id") Purchase purchaseFromDB,
            @RequestBody Purchase purchase
    ) {
        BeanUtils.copyProperties(purchase, purchaseFromDB, "id");

        return purchaseRepo.save(purchaseFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Purchase purchase) {
        purchaseRepo.delete(purchase);
    }

}


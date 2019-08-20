package com.example.shop_app.repo;

import com.example.shop_app.domain.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PurchaseRepo extends JpaRepository<Purchase, Long> {
    @Query(nativeQuery = true, value = "select * from purchase where date >= now() or type='периодическая'")
    List<Purchase> findAllActualPurchase();
}

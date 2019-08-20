package com.example.shop_app.domain;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.GregorianCalendar;

@Entity
@Table
@ToString(of = {"id", "buy", "type", "price", "date"})
@EqualsAndHashCode(of = {"id"})
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String buy;
    private String type;
    private Long price;
    private GregorianCalendar date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuy() {
        return buy;
    }

    public void setBuy(String buy) { this.buy = buy; }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public GregorianCalendar getDate() {
        return date;
    }

    public void setDate(GregorianCalendar date) {
        this.date = date;
    }
}

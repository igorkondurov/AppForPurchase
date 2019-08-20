package com.example.shop_app;

import com.example.shop_app.domain.Purchase;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.GregorianCalendar;

public class TestApp1 {

    private static Long id;
    private static String buy;
    private static String type;
    private static Long price;
    private static GregorianCalendar date;
    static Purchase buy1;

    @BeforeClass
    public static void init() {
        buy = "";
        type = "";
        price = 0L;
        date = new GregorianCalendar(2019, 9, 25);
        buy1 = new Purchase();
    }

    @Test
    public void getId() {
    }

    @Test
    public void setId1() {
        Long expected = 100L;
        buy1.setId(expected);
        Long actual = buy1.getId();
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getBuy() {
    }

    @Test
    public void setBuy1() {
        String expected = "Блокнот";
        buy1.setBuy(expected);
        String actual = buy1.getBuy();
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getType() {
    }

    @Test
    public void setType1() {
        String expected = "разовая";
        buy1.setType(expected);
        String actual = buy1.getType();
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getPrice() {
    }

    @Test
    public void setPrice1() {
        Long expected = 1000L;
        buy1.setPrice(expected);
        Long actual = buy1.getPrice();
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getDate() {
    }

    @Test
    public void setDate1() {
        GregorianCalendar expected = new GregorianCalendar(2019, 10, 15);
        buy1.setDate(expected);
        GregorianCalendar actual = buy1.getDate();
        Assert.assertEquals(expected, actual);
    }
}

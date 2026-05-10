package ru.serp.corpwish.DTO.wishlist;

import lombok.Data;

@Data
public class CreateWishlistRequest {
    // Required
    private String name;

    // Optional
    private String color;
    private String icon;
}

package ru.serp.corpwish.DTO;

import lombok.Data;

@Data
public class WishDto {
    private Long id;
    private String title;
    private String description;
    private Long wishlistId;
}

package ru.serp.corpwish.DTO.wish;

import lombok.Data;

@Data
public class CreateWishRequest {
    private String title;
    private String description;
    private String color;
}

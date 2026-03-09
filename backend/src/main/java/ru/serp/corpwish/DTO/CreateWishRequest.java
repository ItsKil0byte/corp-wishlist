package ru.serp.corpwish.DTO;

import lombok.Data;

@Data
public class CreateWishRequest {
    private String title;
    private String description;
}

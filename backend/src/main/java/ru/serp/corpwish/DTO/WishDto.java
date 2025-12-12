package ru.serp.corpwish.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishDto {
    private Long id;
    private String title;
    private String description;
    private String color;
    private Long wishlistId;
}

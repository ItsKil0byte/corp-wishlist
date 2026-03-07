package ru.serp.corpwish.DTO.wish;

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
    private Long wishlistId;
}

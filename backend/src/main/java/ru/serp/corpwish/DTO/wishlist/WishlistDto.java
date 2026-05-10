package ru.serp.corpwish.DTO.wishlist;

import lombok.Data;
import ru.serp.corpwish.DTO.wish.WishDto;

import java.util.List;

@Data
public class WishlistDto {
    private Long id;
    private String name;
    private String color;
    private String icon;
    private Long ownerId;
    private List<WishDto> wishes;
}

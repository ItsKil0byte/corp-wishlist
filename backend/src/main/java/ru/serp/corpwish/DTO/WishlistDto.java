package ru.serp.corpwish.DTO;

import lombok.Data;

import java.util.List;

@Data
public class WishlistDto {
    private Long id;
    private String name;
    private Long ownerId;
    private List<WishDto> wishes;
}

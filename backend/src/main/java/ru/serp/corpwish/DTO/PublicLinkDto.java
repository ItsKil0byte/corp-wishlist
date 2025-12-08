package ru.serp.corpwish.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serp.corpwish.entity.LinkType;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicLinkDto {
    private LinkType type;
    private Long entityId;
    private String title;
    private String description;
    private List<TelegramUser> users;
    private List<WishlistDto> wishes;
}

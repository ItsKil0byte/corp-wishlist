package ru.serp.corpwish.DTO.link;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serp.corpwish.DTO.auth.telegram.TelegramUser;
import ru.serp.corpwish.DTO.wish.WishDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicLinkDto {
    private String type;
    private Long entityId;
    private String title;
    private List<TelegramUser> users;
    private List<WishDto> wishes;
}

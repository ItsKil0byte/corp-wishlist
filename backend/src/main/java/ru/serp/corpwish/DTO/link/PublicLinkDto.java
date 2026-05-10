package ru.serp.corpwish.DTO.link;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serp.corpwish.DTO.user.UserInfo;
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
    private List<UserInfo> users;
    private List<WishDto> wishes;
}

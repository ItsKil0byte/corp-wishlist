package ru.serp.corpwish.DTO.group;

import lombok.Data;
import ru.serp.corpwish.DTO.auth.telegram.TelegramUser;

import java.util.List;

@Data
public class GroupDto {
    private Long id;
    private String name;
    private List<TelegramUser> members;
}

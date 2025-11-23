package ru.serp.corpwish.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TelegramUser {
    private Long telegramId;

    private String username;

    private String firstName;

    private String lastName;
}

package ru.serp.corpwish.DTO.auth.telegram;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TelegramAuthRequest {
    private String initData;
}

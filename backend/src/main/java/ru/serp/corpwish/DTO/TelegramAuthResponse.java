package ru.serp.corpwish.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TelegramAuthResponse {
    private String token;
}

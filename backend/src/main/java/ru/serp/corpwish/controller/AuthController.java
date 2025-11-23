package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serp.corpwish.DTO.TelegramAuthRequest;
import ru.serp.corpwish.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestBody TelegramAuthRequest request) {
        // TODO: Возвращать токен

        var token = authService.authenticate();

        return ResponseEntity.ok("Авторизация через Telegram прошла успешно.");
    }
}

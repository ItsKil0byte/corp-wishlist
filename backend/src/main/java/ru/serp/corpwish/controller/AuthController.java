package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serp.corpwish.DTO.TelegramAuthRequest;
import ru.serp.corpwish.service.AuthService;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestBody TelegramAuthRequest request)
            throws NoSuchAlgorithmException, InvalidKeyException {

        String token = authService.authenticate(request);

        return ResponseEntity.ok(token);
    }
}

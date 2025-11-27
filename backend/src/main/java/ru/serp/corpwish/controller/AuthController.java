package ru.serp.corpwish.controller;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.TelegramAuthRequest;
import ru.serp.corpwish.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // NOTE: Использовать только для тестов, на проде убрать
    @GetMapping
    public ResponseEntity<Resource> getAuthScript() {
        Resource resource = new ClassPathResource("static/auth.html");
        var headers = new HttpHeaders();
        headers.add(
            HttpHeaders.CONTENT_DISPOSITION,
            "inline; filename=auth.html"
        );
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    @PostMapping
    public ResponseEntity<?> authenticate(
        @RequestBody TelegramAuthRequest request
    ) throws NoSuchAlgorithmException, InvalidKeyException {
        String token = authService.authenticate(request);

        return ResponseEntity.ok(token);
    }
}

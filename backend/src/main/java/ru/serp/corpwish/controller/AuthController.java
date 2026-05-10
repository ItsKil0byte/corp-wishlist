package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.auth.web.WebAuthResponse;
import ru.serp.corpwish.DTO.auth.web.WebLoginRequest;
import ru.serp.corpwish.DTO.auth.web.WebRegisterRequest;
import ru.serp.corpwish.service.auth.AuthService;

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

    @PostMapping("/register")
    public ResponseEntity<WebAuthResponse> registerWithWeb(
            @RequestBody WebRegisterRequest request
    ){
        String token = authService.registerWithWeb(request);

        return ResponseEntity.ok(new WebAuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<WebAuthResponse> loginWithWeb(
            @RequestBody WebLoginRequest request
    ){
        String token = authService.loginWithWeb(request);

        return ResponseEntity.ok(new WebAuthResponse(token));
    }
}

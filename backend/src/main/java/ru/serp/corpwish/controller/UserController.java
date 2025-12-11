package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.UserService;

@RestController()
@RequestMapping("/api/userInfo")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<TelegramUser> getUserInfo (
            @PathVariable Long userId
    ) {
        TelegramUser userInfo = userService.getUserInfo(userId);

        return ResponseEntity.ok(userInfo);
    }

    @PutMapping
    public ResponseEntity<TelegramUser> updateUserInfo (
            @AuthenticationPrincipal User user,
            @RequestBody TelegramUser newUserInfo
    ) {
        TelegramUser userInfo = userService.updateUserInfo(user.getTelegramId(), newUserInfo);

        return ResponseEntity.ok(userInfo);
    }
}

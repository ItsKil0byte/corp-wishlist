package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.serp.corpwish.DTO.user.UserInfo;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.user.UserService;

@RestController()
@RequestMapping("/api/userInfo")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<UserInfo> getUserInfo (
            @AuthenticationPrincipal User user
    ) {
        UserInfo userInfo = userService.getUserInfo(user.getId());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> getUserInfoById(
            @AuthenticationPrincipal User requester,
            @PathVariable Long userId
    ) {

        // Бля, а зачем убирали? Я что-то проморгал
        // TODO: безопасность и т.д.

        UserInfo userInfo = userService.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }

    @PutMapping
    public ResponseEntity<UserInfo> updateUserInfo (
            @AuthenticationPrincipal User user,
            @RequestBody UserInfo newUserInfo
    ) {
        UserInfo userInfo = userService.updateUserInfo(user.getId(), newUserInfo);

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/{userId}/avatar")
    public ResponseEntity<UserInfo> uploadAvatar(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(userService.uploadAvatar(userId, file));
    }

    @DeleteMapping("/{userId}/avatar")
    public ResponseEntity<Void> deleteAvatar(@PathVariable Long userId) {
        userService.deleteAvatar(userId);
        return ResponseEntity.noContent().build();
    }
}

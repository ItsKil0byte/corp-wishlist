package ru.serp.corpwish.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.serp.corpwish.DTO.TelegramUser;

public interface UserService extends UserDetailsService {
    TelegramUser getUserInfo(Long userId);
    TelegramUser updateUserInfo(Long ownerId, TelegramUser userInfo);
}



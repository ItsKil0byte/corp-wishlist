package ru.serp.corpwish.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.DTO.UserInfo;

public interface UserService extends UserDetailsService {
    UserInfo getUserInfo(Long userId);
    UserInfo updateUserInfo(Long ownerId, UserInfo userInfo);
}



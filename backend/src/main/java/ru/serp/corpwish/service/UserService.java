package ru.serp.corpwish.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.DTO.UserInfo;

public interface UserService extends UserDetailsService {
    UserInfo getUserInfo(Long userId);
    UserInfo updateUserInfo(Long ownerId, UserInfo userInfo);
    UserInfo uploadAvatar(Long userId, MultipartFile file);
    void deleteAvatar(Long userId);
}



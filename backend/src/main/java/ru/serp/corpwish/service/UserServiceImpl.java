package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.DTO.UserInfo;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userIDStr) throws UsernameNotFoundException {
        Long userID = Long.parseLong(userIDStr);
        User user = userRepository.findByUserId(userID)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с id " + userIDStr + " не найден."));

        //Возможно добавление AccountExpired() и подобных в будущем
        return user;
    }

    @Override
    public UserInfo getUserInfo(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get user info - no such user"));

        return convertToUserInfo(user);
    }

    @Override
    public UserInfo updateUserInfo(Long ownerId, UserInfo userInfo) {
        User user = userRepository.findByUserId(ownerId)
                .orElseThrow(() -> new RuntimeException("Can not update user info - no such user"));

        User newUserInfo = convertToUser(ownerId, userInfo);

        userRepository.save(newUserInfo);

        return userInfo;
    }

    private UserInfo convertToUserInfo(User user){
        UserInfo userInfo = new UserInfo();

        userInfo.setTelegramId(user.getTelegramId());
        userInfo.setFirstName(user.getFirstName());
        userInfo.setLastName(user.getLastName());
        userInfo.setPhoto_url(user.getPhoto_url());
        userInfo.setInterests(userInfo.getInterests());
        userInfo.setHobbies(userInfo.getHobbies());

        return userInfo;
    }

    private TelegramUser convertToTelegramUser(User user){
        TelegramUser telegramUser = new TelegramUser();

        telegramUser.setId(user.getUserId());
        telegramUser.setUsername(user.getUsername());
        telegramUser.setPhoto_url(user.getPhoto_url());
        telegramUser.setFirstName(user.getFirstName());
        telegramUser.setLastName(user.getLastName());
        telegramUser.setInterests(user.getInterests());
        telegramUser.setHobbies(user.getHobbies());

        return telegramUser;
    }

    private User convertToUser(Long userId, UserInfo userInfo){
        User user = new User();

        user.setUserId(userId);
        user.setTelegramId(userInfo.getTelegramId());
        user.setUsername(userInfo.getUsername());
        user.setPhoto_url(userInfo.getPhoto_url());
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setHobbies(userInfo.getHobbies());
        user.setInterests(userInfo.getInterests());

        return user;
    }
}


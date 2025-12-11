package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String telegramIDStr) throws UsernameNotFoundException {
        Long telegramID = Long.parseLong(telegramIDStr);
        User user = userRepository.findByTelegramId(telegramID)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с id " + telegramIDStr + " не найден."));

        //Возможно добавление AccountExpired() и подобных в будущем
        return user;
    }

    @Override
    public TelegramUser getUserInfo(Long userId) {
        User user = userRepository.findByTelegramId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get user info - no such user"));

        return convertToTelegramUser(user);
    }

    @Override
    public TelegramUser updateUserInfo(Long ownerId, TelegramUser userInfo) {
        User user = userRepository.findByTelegramId(ownerId)
                .orElseThrow(() -> new RuntimeException("Can not update user info - no such user"));

        if(!userInfo.getId().equals(ownerId)){
            throw new RuntimeException("Can not update user info - not an owner");
        }

        User newUserInfo = convertToUser(userInfo);

        userRepository.save(newUserInfo);

        return userInfo;
    }

    private TelegramUser convertToTelegramUser(User user){
        TelegramUser telegramUser = new TelegramUser();

        telegramUser.setId(user.getTelegramId());
        telegramUser.setUsername(user.getUsername());
        telegramUser.setFirstName(user.getFirstName());
        telegramUser.setLastName(user.getLastName());
        telegramUser.setInterests(user.getInterests());
        telegramUser.setHobbies(user.getHobbies());

        return telegramUser;
    }

    private User convertToUser(TelegramUser telegramUser){
        User user = new User();

        user.setTelegramId(telegramUser.getId());
        user.setUsername(telegramUser.getUsername());
        user.setFirstName(telegramUser.getFirstName());
        user.setLastName(telegramUser.getLastName());
        user.setHobbies(telegramUser.getHobbies());
        user.setInterests(telegramUser.getInterests());

        return user;
    }
}

package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.serp.corpwish.DTO.*;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.validator.TelegramValidator;

@Service
@RequiredArgsConstructor
@Transactional // На случай если поймаем ошибку в группах / вишлистах при инициализации
public class AuthService {

    private final TelegramValidator validator;
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    private final GroupService groupService;
    private final WishlistService wishlistService;

    public String authenticateWithTelegram(TelegramAuthRequest user) {
        TelegramUser telegramUser = validator.validate(user.getInitData());

        Long userID = userRepository.findByTelegramId(telegramUser.getId())
                .orElseGet(() -> {
                    User newUser = createNewTelegramUser(telegramUser);
                    initNewUser(newUser.getUserId());
                    return newUser;
                }).getUserId();

        return jwtService.generateToken(userID);
    }

    public String registerWithWeb(WebRegisterRequest user) {
        if (userRepository.existsByLogin(user.getLogin())) {
            throw new RuntimeException("Пользователь уже существует");
        }

        User newUser = createNewWebUser(user);
        initNewUser(newUser.getUserId());

        return jwtService.generateToken(newUser.getUserId());
    }

    public String loginWithWeb(WebLoginRequest userInfo) {
        User user = userRepository.findByLogin(userInfo.getLogin())
                .orElseThrow(() -> new RuntimeException("Пользователя не существует"));

        if (!passwordEncoder.matches(userInfo.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Пароли не совпадают");
        }

        return jwtService.generateToken(user.getUserId());
    }

    private User createNewWebUser(WebRegisterRequest user) {
        User newUser = new User();

        newUser.setLogin(user.getLogin());
        newUser.setUsername(user.getLogin()); // Ставим логин, чтобы не было null по умолчанию
        newUser.setPasswordHash(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);

        return newUser;
    }

    private User createNewTelegramUser(TelegramUser user) {
        User newUser = new User();

        newUser.setTelegramId(user.getId());
        newUser.setUsername(user.getUsername());
        newUser.setPhoto_url(user.getPhoto_url());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        return userRepository.save(newUser);
    }

    private void initNewUser(Long userId) {
        // Вишлист
        CreateWishlistRequest wishlistRequest = new CreateWishlistRequest();
        wishlistRequest.setName("Новый год 2026");
        wishlistRequest.setColor("#00ee63");
        wishlistRequest.setIcon("\uD83C\uDF84");
        wishlistService.createWishlist(userId, wishlistRequest);

        // Группа
        CreateGroupRequest groupRequest = new CreateGroupRequest();
        groupRequest.setName("Друзьяшки");
        groupRequest.setIcon("\uD83C\uDF81");
        groupService.createGroup(userId, groupRequest);
    }
}

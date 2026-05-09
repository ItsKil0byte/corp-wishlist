package ru.serp.corpwish.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.serp.corpwish.DTO.auth.web.WebLoginRequest;
import ru.serp.corpwish.DTO.auth.web.WebRegisterRequest;
import ru.serp.corpwish.DTO.group.CreateGroupRequest;
import ru.serp.corpwish.DTO.wishlist.CreateWishlistRequest;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.service.group.GroupService;
import ru.serp.corpwish.service.jwt.JWTService;
import ru.serp.corpwish.service.wishlist.WishlistService;

@Service
@RequiredArgsConstructor
@Transactional // На случай если поймаем ошибку в группах / вишлистах при инициализации
public class AuthService {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    private final GroupService groupService;
    private final WishlistService wishlistService;

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

    private void initNewUser(Long userId) {
        // Вишлист
        CreateWishlistRequest wishlistRequest = new CreateWishlistRequest();
        wishlistRequest.setName("Новый год 2026");
        wishlistRequest.setColor("main-theme-lite");
        wishlistRequest.setIcon("\uD83C\uDF84");
        wishlistService.createWishlist(userId, wishlistRequest);

        // Группа
        CreateGroupRequest groupRequest = new CreateGroupRequest();
        groupRequest.setName("Друзьяшки");
        groupRequest.setIcon("\uD83C\uDF81");
        groupService.createGroup(userId, groupRequest);
    }
}

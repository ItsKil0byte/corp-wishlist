package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.auth.telegram.TelegramAuthRequest;
import ru.serp.corpwish.DTO.auth.telegram.TelegramUser;
import ru.serp.corpwish.DTO.auth.web.WebLoginRequest;
import ru.serp.corpwish.DTO.auth.web.WebRegisterRequest;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.validator.TelegramValidator;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TelegramValidator validator;
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    public String authenticateWithTelegram(TelegramAuthRequest user){
        TelegramUser telegramUser = validator.validate(user.getInitData());

        Long userID = userRepository.findByTelegramId(telegramUser.getId())
                .orElseGet(() -> createNewTelegramUser(telegramUser))
                .getTelegramId();

        return jwtService.generateToken(userID);
    }

    public String registerWithWeb(WebRegisterRequest user){
        if(userRepository.existsByLogin(user.getLogin())){
            throw new RuntimeException("Пользователь уже существует");
        }

        User newUser = createNewWebUser(user);

        return jwtService.generateToken(newUser.getUserId());
    }

    public String loginWithWeb(WebLoginRequest userInfo){
        User user = userRepository.findByLogin(userInfo.getLogin())
                .orElseThrow(() -> new RuntimeException("Пользователя не существует"));

        if(!passwordEncoder.matches(userInfo.getPassword(), user.getPasswordHash())){
            throw new RuntimeException("Пароли не совпадают");
        }

        return jwtService.generateToken(user.getUserId());
    }

    private User createNewWebUser(WebRegisterRequest user){
        User newUser = new User();

        newUser.setLogin(user.getLogin());
        newUser.setPasswordHash(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);

        return newUser;
    }

    private User createNewTelegramUser(TelegramUser user) {
        User newUser = new User();

        newUser.setTelegramId(user.getId());
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        return userRepository.save(newUser);
    }
}

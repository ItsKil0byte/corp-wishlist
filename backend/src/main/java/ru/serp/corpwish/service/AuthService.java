package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.TelegramAuthRequest;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.validator.TelegramValidator;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TelegramValidator validator;
    private final UserRepository userRepository;
    private final JWTService jwtService;

    public String authenticate(TelegramAuthRequest user){
        TelegramUser telegramUser = validator.validate(user.getInitData());

        Long userID = userRepository.findById(telegramUser.getId())
                .orElseGet(() -> createNewUser(telegramUser))
                .getTelegramId();

        return jwtService.generateToken(userID);
    }

    private User createNewUser(TelegramUser user) {
        User newUser = new User();

        newUser.setTelegramId(user.getId());
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        return userRepository.save(newUser);
    }
}

package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    // TODO: Добавить валидатор
    private final UserRepository userRepository;
    private final JWTService jwtService;

    // TODO: Должен принимать initData, желательно через DTO
    public String authenticate() {

        // TODO: Валидировать запрос

        var user = userRepository.findById(1L).orElseGet(this::createNewUser);

        return jwtService.generateToken(user);
    }

    // TODO: Должен принимать распарсенные данные от валидатора
    private User createNewUser() {
        User newUser = new User();

        newUser.setTelegramId(1L);
        newUser.setUsername("todo");
        newUser.setFirstName("todo");
        newUser.setLastName("todo");

        return userRepository.save(newUser);
    }
}

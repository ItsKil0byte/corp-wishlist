package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
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
}


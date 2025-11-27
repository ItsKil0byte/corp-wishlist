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
    public UserDetails loadUserByUsername(String telegramIDStr) throws UsernameNotFoundException {
        Long telegramID = Long.parseLong(telegramIDStr);
        User user = userRepository.findByTelegramId(telegramID)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с id " + telegramIDStr + " не найден."));

        //Возможно добавление AccountExpired() и подобных в будущем
        return org.springframework.security.core.userdetails.User
                .withUsername(telegramIDStr)
                .password("")
                .authorities(user.getAuthorities())
                .build();
    }
}

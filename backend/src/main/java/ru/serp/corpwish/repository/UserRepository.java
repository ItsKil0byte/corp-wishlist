package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByTelegramId(Long telegramID);
    boolean existsByLogin(String login);
}

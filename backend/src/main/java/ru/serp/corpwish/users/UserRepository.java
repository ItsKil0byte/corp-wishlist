package ru.serp.corpwish.users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Boolean existsByLogin(String login);
    // User findByLogin(String login);
}

package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.Link;

import java.util.Optional;

public interface LinksRepository extends JpaRepository<Link, Long> {
    Optional<Link> findByToken(String token);
}

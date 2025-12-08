package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.Link;

public interface LinksRepository extends JpaRepository<Link, Long> {

}

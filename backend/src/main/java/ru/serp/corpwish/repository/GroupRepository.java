package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
}

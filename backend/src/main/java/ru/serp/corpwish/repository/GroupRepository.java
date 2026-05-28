package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query("""
            SELECT COUNT(g) > 0 FROM Group g
            WHERE (g.owner.userId = :firstUserId OR :firstUserId IN (SELECT m.userId FROM g.members m))
              AND (g.owner.userId = :secondUserId OR :secondUserId IN (SELECT m.userId FROM g.members m))
            """)
    boolean existsCommonGroup(
            @Param("firstUserId") Long firstUserId,
            @Param("secondUserId") Long secondUserId
    );
}

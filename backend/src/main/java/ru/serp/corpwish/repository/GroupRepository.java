package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query("""
            SELECT COUNT(g) > 0 FROM Group g
            JOIN g.members m
            WHERE g.owner.userId = :ownerId
              AND m.userId = :memberId
            """)
    boolean existsByOwnerIdAndMemberId(
            @Param("ownerId") Long ownerId,
            @Param("memberId") Long memberId
    );
}

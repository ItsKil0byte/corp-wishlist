package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Link;
import ru.serp.corpwish.entity.LinkType;

import java.util.Optional;

public interface LinksRepository extends JpaRepository<Link, Long> {
    Optional<Link> findByToken(String token);
    @Query("""
            SELECT COUNT(l) > 0 FROM Link l
            WHERE l.entityId = :wishlistId
              AND l.type = :type
              AND l.active = true
              AND (l.expireAt IS NULL OR l.expireAt > CURRENT_TIMESTAMP)
            """)
    boolean existsByEntityIdAndTypeAndActiveAndExpireAfter(
            @Param("wishlistId") Long wishlistId,
            @Param("type") LinkType type,
            @Param("active") boolean active
    );
}

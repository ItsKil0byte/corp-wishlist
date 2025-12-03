package ru.serp.corpwish.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Wish;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Long> {

    @Query(
            """
            SELECT wish FROM Wish wish
            WHERE wish.wishlist.id = :wishlistId AND (:cursor IS NULL OR wish.id < :cursor)
            ORDER BY wish.id DESC
            """
    )
    List<Wish> findNextWishes(
            @Param("wishlistId") Long wishlistId, @Param("cursor") Long cursor, Pageable pageable
    );
}

package ru.serp.corpwish.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Wish;

import java.util.List;
import java.util.Optional;

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

    @Query("""
    SELECT w FROM Wish w 
    JOIN FETCH w.wishlist wl 
    JOIN FETCH wl.owner 
    WHERE :filename MEMBER OF w.imageFileNames
    """)
    Optional<Wish> findByImageFileName(@Param("filename") String filename);
}

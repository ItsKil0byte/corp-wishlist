package ru.serp.corpwish.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.Wishlist;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    // Курсор - последний индекс элемента на экране. То есть как только
    // кончилось место -> грузим ещё pageable штук, начиная с cursor.

    // Всё ещё не уверен, что оно нужно, но пусть будет на всякий.

    @Query("""
            SELECT wishlist FROM Wishlist wishlist
            WHERE wishlist.owner.userId = :ownerId
                AND (:cursor IS NULL OR wishlist.id < :cursor)
            ORDER BY wishlist.id DESC
            """)
    List<Wishlist> findNextWishlists(
            @Param("ownerId") Long ownerId, @Param("cursor") Long cursor, Pageable pageable
    );
}

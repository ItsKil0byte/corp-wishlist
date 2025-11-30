package ru.serp.corpwish.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    // Как я понял из документации, Page нам может пригодиться, чтобы не грузить
    // на фронт все данные, а лишь кусочек. Если пойму что фигня - переделаю

    Page<Wishlist> findByOwnerTelegramId(Long ownerId, Pageable pageable);
}

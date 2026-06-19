package ru.serp.corpwish.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.serp.corpwish.entity.BlogPost;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    Optional<BlogPost> findBySlug(String slug);

    Page<BlogPost> findAllByOrderByPublishedAtDesc(Pageable pageable);

    Page<BlogPost> findAllByCategoryOrderByPublishedAtDesc(
        String category,
        Pageable pageable
    );
}

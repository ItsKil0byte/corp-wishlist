package ru.serp.corpwish.service.blog;

import org.springframework.data.domain.Page;
import ru.serp.corpwish.DTO.blog.BlogPostDto;

public interface BlogPostService {
    Page<BlogPostDto> getAllPosts(int page, int limit, String category);
    BlogPostDto getPostBySlug(String slug);
}

package ru.serp.corpwish.service;

import org.springframework.data.domain.Page;
import ru.serp.corpwish.DTO.BlogPostDto;

public interface BlogPostService {
    Page<BlogPostDto> getAllPosts(int page, int limit);
    BlogPostDto getPostBySlug(String slug);
}

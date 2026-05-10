package ru.serp.corpwish.controller;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.blog.BlogPostDto;
import ru.serp.corpwish.service.blog.BlogPostService;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogPostService blogService;

    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getAllPosts(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) int limit
    ) {
        List<BlogPostDto> posts = blogService.getAllPosts(page, limit).getContent();

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDto> getPost(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getPostBySlug(slug));
    }
}

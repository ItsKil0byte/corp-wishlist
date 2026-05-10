package ru.serp.corpwish.controller;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import ru.serp.corpwish.DTO.BlogPostDto;
import ru.serp.corpwish.service.BlogPostService;
import ru.serp.corpwish.service.FileService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogPostService blogService;
    private final FileService fileService;

    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getAllPosts(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) int limit) {
        List<BlogPostDto> posts = blogService.getAllPosts(page, limit).getContent();

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDto> getPost(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getPostBySlug(slug));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadBlogImage(@RequestParam("file") MultipartFile file) {
        String filename = fileService.store(file);
        String url = "/uploads/" + filename;

        Map<String, String> response = new HashMap<>();
        response.put("url", url);

        return ResponseEntity.ok(response);
    }
}

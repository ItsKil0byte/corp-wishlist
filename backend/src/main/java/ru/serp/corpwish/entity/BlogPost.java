package ru.serp.corpwish.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "blog_posts")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 200)
    private String slug;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(name = "preview_image")
    private String previewImage;

    @Column(name = "preview_content")
    private String previewContent;

    @Column(nullable = false)
    private String content;

    @Column(name = "published_at", nullable = false)
    private ZonedDateTime publishedAt;
}

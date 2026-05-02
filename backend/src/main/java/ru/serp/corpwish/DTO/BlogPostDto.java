package ru.serp.corpwish.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostDto {
    private Long id;
    private String slug;
    private String title;

    @JsonProperty("preview_image")
    private String previewImage;

    @JsonProperty("preview_content")
    private String previewContent;

    private String content;

    @JsonProperty("published_at")
    private ZonedDateTime publishedAt;
}

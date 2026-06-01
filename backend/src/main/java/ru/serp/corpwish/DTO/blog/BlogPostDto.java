package ru.serp.corpwish.DTO.blog;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String category;

    @JsonProperty("published_at")
    private ZonedDateTime publishedAt;
}

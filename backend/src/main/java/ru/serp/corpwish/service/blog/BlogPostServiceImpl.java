package ru.serp.corpwish.service.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.blog.BlogPostDto;
import ru.serp.corpwish.entity.BlogPost;
import ru.serp.corpwish.repository.BlogPostRepository;

@Service
@RequiredArgsConstructor
public class BlogPostServiceImpl implements BlogPostService {

    private final BlogPostRepository blogPostRepository;

    /**
     * Получение всех постов с возможностью фильтрации по категории
     */
    @Override
    public Page<BlogPostDto> getAllPosts(int page, int limit, String category) {
        Pageable pageable = PageRequest.of(
            page,
            limit,
            Sort.by(Sort.Direction.DESC, "publishedAt")
        );
        Page<BlogPost> postsPage;

        if (category != null && !category.isEmpty()) {
            // Фильтрация по категории, если она указана
            postsPage =
                blogPostRepository.findAllByCategoryOrderByPublishedAtDesc(
                    category,
                    pageable
                );
        } else {
            // Иначе возвращаем все посты
            postsPage = blogPostRepository.findAllByOrderByPublishedAtDesc(
                pageable
            );
        }

        return postsPage.map(this::convertBlogPostToDto);
    }

    @Override
    public BlogPostDto getPostBySlug(String slug) {
        BlogPost post = blogPostRepository
            .findBySlug(slug)
            .orElseThrow(() ->
                new RuntimeException(
                    "Can not get post by slug, no such post with this slug"
                )
            );

        return convertBlogPostToDto(post);
    }

    /**
     * Преобразование сущности BlogPost в DTO
     */
    private BlogPostDto convertBlogPostToDto(BlogPost post) {
        return new BlogPostDto(
            post.getId(),
            post.getSlug(),
            post.getTitle(),
            post.getPreviewImage(),
            post.getPreviewContent(),
            post.getContent(),
            post.getCategory(),
            post.getPublishedAt()
        );
    }
}

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

    @Override
    public Page<BlogPostDto> getAllPosts(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "publishedAt"));
        Page<BlogPost> postsPage = blogPostRepository.findAllByOrderByPublishedAtDesc(pageable);

        return postsPage.map(this::convertBlogPostToDto);
    }

    @Override
    public BlogPostDto getPostBySlug(String slug) {
        BlogPost post = blogPostRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Can not get post by slug, no such post with this slug"));

        return convertBlogPostToDto(post);
    }

    private BlogPostDto convertBlogPostToDto(BlogPost post){
        return new BlogPostDto(
                post.getId(),
                post.getSlug(),
                post.getTitle(),
                post.getPreviewImage(),
                post.getPreviewContent(),
                post.getContent(),
                post.getPublishedAt()
        );
    }
}

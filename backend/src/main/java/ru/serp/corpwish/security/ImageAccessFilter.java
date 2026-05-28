package ru.serp.corpwish.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.serp.corpwish.entity.LinkType;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.entity.Wish;
import ru.serp.corpwish.repository.GroupRepository;
import ru.serp.corpwish.repository.LinksRepository;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.repository.WishRepository;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ImageAccessFilter extends OncePerRequestFilter {

    private final WishRepository wishRepository;
    private final LinksRepository linksRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        if (!uri.startsWith("/uploads/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String filename = uri.substring(uri.lastIndexOf('/') + 1);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User currentUser)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication required");
            return;
        }

        Optional<Wish> wishOpt = wishRepository.findByImageFileName(filename);
        if (wishOpt.isPresent()) {
            Wish wish = wishOpt.get();
            Long ownerId = wish.getWishlist().getOwner().getId();
            Long wishlistId = wish.getWishlist().getId();

            boolean hasAccess = false;

            if (ownerId.equals(currentUser.getId())) {
                hasAccess = true;
            }
            else if (linksRepository.existsByEntityIdAndTypeAndActiveAndExpireAfter(wishlistId, LinkType.WISHLIST_SHARE, true)) {
                hasAccess = true;
            }
            else if (groupRepository.existsCommonGroup(ownerId, currentUser.getId())) {
                hasAccess = true;
            }

            if (hasAccess) {
                filterChain.doFilter(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied to this image");
            }
            return;
        }

        //Аватарки пусть будут публичные на всякий
        Optional<User> avatarOwnerOpt = userRepository.findByPhotoUrl(filename);
        if (avatarOwnerOpt.isPresent()) {
            filterChain.doFilter(request, response);
            return;
        }

        // Файл не найден ни в одном источнике
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Image not found in database");
    }
}
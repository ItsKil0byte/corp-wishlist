package ru.serp.corpwish.service;

import org.springframework.data.domain.Pageable;
import ru.serp.corpwish.DTO.wishlist.CreateWishlistRequest;
import ru.serp.corpwish.DTO.wishlist.WishlistDto;

import java.util.List;

public interface WishlistService {

    List<WishlistDto> getWishlists(Long ownerId, Long cursor, Pageable pageable);

    // Requester - то есть тот, кто запрашивает. Если мы будем в будущем
    // настраивать приватность, то сможем по нему понять, разрешён ли ему доступ
    // или нет.
    WishlistDto getWishlist(Long requesterId, Long wishlistId);

    WishlistDto createWishlist(Long ownerId, CreateWishlistRequest request);

    WishlistDto updateWishlist(Long ownerId, Long wishlistId, CreateWishlistRequest request);

    void deleteWishlist(Long ownerId, Long wishlistId);

    // Продолжая о приватности, нашёл ещё две интересные реализации на будущее:
    // - listForOwner - возвращает список всех вишлистов (если они приватные)
    // - listPublic - возвращает публичные вишлисты

}

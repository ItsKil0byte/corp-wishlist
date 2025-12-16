package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.CreateWishlistRequest;
import ru.serp.corpwish.DTO.WishlistDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.WishlistService;

import java.util.List;

@RestController
@RequestMapping("/api/wishlists")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistDto>> getWishlists(
            @AuthenticationPrincipal User owner,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "25") int limit
    ) {
        List<WishlistDto> wishlistsDto = wishlistService
                .getWishlists(
                        owner.getTelegramId(),
                        cursor,
                        PageRequest.of(0, limit)
                );

        return ResponseEntity.ok(wishlistsDto);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WishlistDto>> getWishlistsByOwner(
            @AuthenticationPrincipal User requester, // Пригодится для будущей логики
            @PathVariable Long userId, // ID пользователя, чьи вишлисты запрашиваются
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "25") int limit
    ) {
        // В текущей упрощенной логике: всегда возвращаем вишлисты пользователя userId
        // (предполагается, что они все "публичные")
        // TODO: Нужно реализовать ограничения на приватные и публичные вишлисты для последующих релизов

        List<WishlistDto> wishlistsDto = wishlistService
                .getWishlists(userId, cursor, PageRequest.of(0, limit));

        return ResponseEntity.ok(wishlistsDto);
    }

    @GetMapping("/{wishlistId}")
    public ResponseEntity<WishlistDto> getWishlist(
            @AuthenticationPrincipal User requester,
            @PathVariable Long wishlistId
    ) {
        WishlistDto wishlistDto = wishlistService
                .getWishlist(requester.getTelegramId(), wishlistId);

        return ResponseEntity
                .ok(wishlistDto);
    }

    @PostMapping
    public ResponseEntity<WishlistDto> createWishlist(
            @AuthenticationPrincipal User owner,
            @RequestBody CreateWishlistRequest request
    ) {
        WishlistDto wishlistDto = wishlistService
                .createWishlist(owner.getTelegramId(), request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishlistDto);
    }

    @PutMapping("/{wishlistId}")
    public ResponseEntity<WishlistDto> updateWishlist(
            @AuthenticationPrincipal User owner,
            @PathVariable Long wishlistId,
            @RequestBody CreateWishlistRequest request
    ) {
        WishlistDto wishlistDto = wishlistService
                .updateWishlist(owner.getTelegramId(), wishlistId, request);

        return ResponseEntity
                .ok(wishlistDto);
    }

    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<Void> deleteWishlist(
            @AuthenticationPrincipal User owner,
            @PathVariable Long wishlistId
    ) {
        wishlistService.deleteWishlist(owner.getTelegramId(), wishlistId);
        return ResponseEntity.noContent().build();
    }
}

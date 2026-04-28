package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.serp.corpwish.DTO.CreateWishRequest;
import ru.serp.corpwish.DTO.WishDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.entity.Wish;
import ru.serp.corpwish.service.FileService;
import ru.serp.corpwish.service.WishService;

import java.util.List;

@RestController
@RequestMapping("/api/wishes")
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;
    private final FileService fileService;

    @GetMapping
    public ResponseEntity<List<WishDto>> getWishes(
            @AuthenticationPrincipal User owner,
            @RequestParam Long wishlistId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "25") int limit
    ){
        List<WishDto> wishes = wishService.getWishes(
                wishlistId,
                cursor,
                PageRequest.of(0, limit)
        );

        return ResponseEntity.ok(wishes);
    }


    @GetMapping("/{wishId}")
    public ResponseEntity<WishDto> getWish(
            @AuthenticationPrincipal User requester,
            @PathVariable Long wishId
    ) {
        WishDto wish = wishService.getWish(
                requester.getUserId(),
                wishId
        );

        return ResponseEntity.ok(wish);
    }

    @PostMapping("/{wishlistId}")
    public ResponseEntity<WishDto> createWish(
            @AuthenticationPrincipal User owner,
            @PathVariable Long wishlistId,
            @RequestBody CreateWishRequest wishRequest
    ) {
        WishDto wish = wishService.createWish(
                wishlistId,
                wishRequest
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(wish);
    }

    @PutMapping("/{wishId}")
    public ResponseEntity<WishDto> updateWish(
            @AuthenticationPrincipal User owner,
            @PathVariable Long wishId,
            @RequestBody CreateWishRequest wishRequest
    ) {
        WishDto wish = wishService.updateWish(
                owner.getUserId(),
                wishId,
                wishRequest
        );

        return ResponseEntity.ok(wish);
    }

    @DeleteMapping("/{wishId}")
    public ResponseEntity<Void> deleteWish(
            @AuthenticationPrincipal User owner,
            @PathVariable Long wishId
    ) {
        wishService.deleteWish(
                owner.getUserId(),
                wishId
        );
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{wishId}/images")
    public ResponseEntity<WishDto> uploadImages(
            @PathVariable Long wishId,
            @RequestParam("files") List<MultipartFile> files) {

        List<String> saved = files.stream()
                .map(fileService::store)
                .toList();

        WishDto updated = wishService.addImages(wishId, saved);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{wishId}/images/{filename}")
    public ResponseEntity<Void> deleteImage(
            @PathVariable Long wishId,
            @PathVariable String filename) {

        fileService.delete(filename);
        wishService.removeImage(wishId, filename);
        return ResponseEntity.noContent().build();
    }
}

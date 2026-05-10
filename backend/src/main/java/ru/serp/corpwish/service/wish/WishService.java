package ru.serp.corpwish.service.wish;

import org.springframework.data.domain.Pageable;
import ru.serp.corpwish.DTO.wish.CreateWishRequest;
import ru.serp.corpwish.DTO.wish.WishDto;

import java.util.List;

public interface WishService {

    List<WishDto> getWishes(Long wishlistId, Long cursor, Pageable pageable);

    WishDto getWish(Long requesterId, Long wishId);

    WishDto createWish(Long wishlistId, CreateWishRequest wishRequest);

    WishDto updateWish(Long ownerId, Long wishId, CreateWishRequest wishRequest);

    void deleteWish(Long ownerId, Long wishId);

    WishDto addImages(Long wishId, List<String> filenames);

    void removeImage(Long wishId, String filename);
}

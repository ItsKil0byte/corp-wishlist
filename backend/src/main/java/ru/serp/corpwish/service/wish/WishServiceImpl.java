package ru.serp.corpwish.service.wish;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.wish.CreateWishRequest;
import ru.serp.corpwish.DTO.wish.WishDto;
import ru.serp.corpwish.entity.Wish;
import ru.serp.corpwish.entity.Wishlist;
import ru.serp.corpwish.repository.WishRepository;
import ru.serp.corpwish.repository.WishlistRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishServiceImpl implements WishService {
    private final WishRepository wishRepository;
    private final WishlistRepository wishlistRepository;

    @Override
    public List<WishDto> getWishes(Long wishlistId, Long cursor, Pageable pageable) {
        List<Wish> wishes = wishRepository.findNextWishes(wishlistId, cursor, pageable);

        return wishes.stream().map(this::convertToDto).toList();
    }

    @Override
    public WishDto getWish(Long requesterId, Long wishId) {
        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new RuntimeException("Can not get wish - Wish not found"));

        return convertToDto(wish);
    }

    @Override
    public WishDto createWish(Long wishlistId, CreateWishRequest wishRequest) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Can not create wish - Wishlist not found"));

        Wish wish = new Wish();
        wish.setTitle(wishRequest.getTitle());
        wish.setDescription(wishRequest.getDescription());
        wish.setColor(wishRequest.getColor());
        wish.setWishlist(wishlist);

        wishRepository.save(wish);

        return convertToDto(wish);
    }

    @Override
    public WishDto updateWish(Long ownerId, Long wishId, CreateWishRequest wishRequest) {
        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new RuntimeException("Can not update wish - wish not found"));

        if(!wish.getWishlist().getOwner().getId().equals(ownerId)){
            throw new RuntimeException("Can not update wish - not an owner");
        }

        wish.setTitle(wishRequest.getTitle());
        wish.setDescription(wishRequest.getDescription());
        wish.setColor(wishRequest.getColor());

        wishRepository.save(wish);

        return convertToDto(wish);
    }

    @Override
    public void deleteWish(Long ownerId, Long wishId) {
        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new RuntimeException("Can not delete wish - no such wish"));

        if(!wish.getWishlist().getOwner().getId().equals(ownerId)){
            throw new RuntimeException("Can not delete wish - not an owner");
        }

        wishRepository.delete(wish);
    }

    public WishDto addImages(Long wishId, List<String> filenames) {
        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new RuntimeException("Can not add images - no such wish"));
        wish.getImageFileNames().addAll(filenames);
        return convertToDto(wishRepository.save(wish));
    }

    public void removeImage(Long wishId, String filename) {
        Wish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new RuntimeException("Can not delete image - no such wish"));
        wish.getImageFileNames().remove(filename);
        wishRepository.save(wish);
    }

    private WishDto convertToDto(Wish wish){
        WishDto wishDto = new WishDto();

        wishDto.setId(wish.getId());
        wishDto.setTitle(wish.getTitle());
        wishDto.setDescription(wish.getDescription());
        wishDto.setColor(wish.getColor());
        wishDto.setWishlistId(wish.getWishlist().getId());
        wishDto.setImageUrls(wish.getImageUrls());

        return wishDto;
    }
}

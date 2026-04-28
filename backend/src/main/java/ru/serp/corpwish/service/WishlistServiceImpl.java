package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.CreateWishlistRequest;
import ru.serp.corpwish.DTO.WishDto;
import ru.serp.corpwish.DTO.WishlistDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.entity.Wishlist;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.repository.WishlistRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    // TODO: Переработать исключения

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    @Override
    public List<WishlistDto> getWishlists(Long ownerId, Long cursor, Pageable pageable) {
        // TODO: Реализовать перегрузку метода для запроса чужих вишлистов

        List<Wishlist> wishlists = wishlistRepository.findNextWishlists(ownerId, cursor, pageable);

        return wishlists.stream().map(this::convertToDto).toList();
    }

    @Override
    public WishlistDto getWishlist(Long requesterId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return convertToDto(wishlist);
    }

    @Override
    public WishlistDto createWishlist(Long ownerId, CreateWishlistRequest request) {
        User owner = userRepository.findByUserId(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setName(request.getName());
        wishlist.setOwner(owner);
        wishlist.setColor(request.getColor());
        wishlist.setIcon(request.getIcon());

        wishlistRepository.save(wishlist);
        return convertToDto(wishlist);
    }

    @Override
    public WishlistDto updateWishlist(Long ownerId, Long wishlistId, CreateWishlistRequest request) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        if (!wishlist.getOwner().getUserId().equals(ownerId)) {
            throw new RuntimeException("Only owner can update wishlist");
        }

        wishlist.setName(request.getName());
        wishlist.setColor(request.getColor());
        wishlist.setIcon(request.getIcon());

        wishlistRepository.save(wishlist);
        return convertToDto(wishlist);
    }

    @Override
    public void deleteWishlist(Long ownerId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        if (!wishlist.getOwner().getUserId().equals(ownerId)) {
            throw new RuntimeException("Only owner delete this wishlist");
        }

        wishlistRepository.delete(wishlist);
    }

    private WishlistDto convertToDto(Wishlist wishlist) {
        WishlistDto wishlistDto = new WishlistDto();

        wishlistDto.setId(wishlist.getId());
        wishlistDto.setName(wishlist.getName());
        wishlistDto.setOwnerId(wishlist.getOwner().getUserId());
        wishlistDto.setColor(wishlist.getColor());
        wishlistDto.setIcon(wishlist.getIcon());
        wishlistDto.setWishes(
                wishlist.getWishes().stream()
                        .map(wish -> new WishDto(
                                wish.getId(), wish.getTitle(), wish.getDescription(), wish.getColor(), wishlist.getId(), wish.getImageUrls()
                        )).toList()
        );

        return wishlistDto;
    }
}

package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.CreateWishlistRequest;
import ru.serp.corpwish.DTO.WishlistDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.entity.Wishlist;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.repository.WishlistRepository;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    // TODO: Переработать исключения

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    @Override
    public WishlistDto getWishlist(Long requesterId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return convertToDto(wishlist);
    }

    @Override
    public WishlistDto createWishlist(Long ownerId, CreateWishlistRequest request) {
        User owner = userRepository.findByTelegramId(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setName(request.getTitle());
        wishlist.setOwner(owner);

        return convertToDto(wishlist);
    }

    @Override
    public WishlistDto updateWishlist(Long ownerId, Long wishlistId, CreateWishlistRequest request) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        if (!wishlist.getOwner().getTelegramId().equals(ownerId)) {
            throw new RuntimeException("Only owner can update wishlist");
        }

        wishlist.setName(request.getTitle());

        return convertToDto(wishlist);
    }

    @Override
    public void deleteWishlist(Long ownerId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        if (!wishlist.getOwner().getTelegramId().equals(ownerId)) {
            throw new RuntimeException("Only owner delete this wishlist");
        }

        wishlistRepository.delete(wishlist);
    }

    private WishlistDto convertToDto(Wishlist wishlist) {
        WishlistDto wishlistDto = new WishlistDto();

        wishlistDto.setId(wishlist.getId());
        wishlistDto.setName(wishlist.getName());
        wishlistDto.setOwnerId(wishlist.getOwner().getTelegramId());

        return wishlistDto;
    }
}

package ru.serp.corpwish.service.link;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.auth.telegram.TelegramUser;
import ru.serp.corpwish.DTO.group.GroupDto;
import ru.serp.corpwish.DTO.link.InviteLinkDto;
import ru.serp.corpwish.DTO.link.PublicLinkDto;
import ru.serp.corpwish.DTO.wish.WishDto;
import ru.serp.corpwish.entity.*;
import ru.serp.corpwish.repository.GroupRepository;
import ru.serp.corpwish.repository.LinksRepository;
import ru.serp.corpwish.repository.WishlistRepository;
import ru.serp.corpwish.service.group.GroupService;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class LinkServiceImpl implements LinkService {

    private final LinksRepository linksRepository;
    private final WishlistRepository wishlistRepository;
    private final GroupService groupService;
    private final GroupRepository groupRepository;

    @Override
    public InviteLinkDto createLink(
            User owner, LinkType type, Long entityId, Instant expiresAt, String baseUrl
    ) {
        Link inviteLink = Link.builder()
                .token(generateToken())
                .type(type)
                .entityId(entityId)
                .owner(owner)
                .createdAt(Instant.now())
                .expireAt(expiresAt)
                .active(true)
                .build();

        Link savedInviteLink = linksRepository.save(inviteLink);
        String url = baseUrl + "/public/link/" + savedInviteLink.getToken();

        return InviteLinkDto.builder()
                .token(savedInviteLink.getToken())
                .url(url)
                .type(savedInviteLink.getType().name())
                .entityId(savedInviteLink.getEntityId())
                .createdAt(savedInviteLink.getCreatedAt())
                .expiresAt(savedInviteLink.getExpireAt())
                .active(savedInviteLink.isActive())
                .build();
    }

    @Override
    public GroupDto joinGroup(String token, User user) {
        Link link = linksRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Link not found"));

        if (!link.isActive()) {
            throw new RuntimeException("Link is not active");
        }
        if (link.getType() != LinkType.GROUP_INVITE) {
            throw new RuntimeException("Link is not a group invitation link");
        }
        if (link.getExpireAt() != null && link.getExpireAt().isBefore(Instant.now())) {
            throw new RuntimeException("Link expired");
        }
        if (user == null) {
            throw new RuntimeException("No user provided to join");
        }

        return groupService.joinGroup(link.getEntityId(), user.getUserId(), user.getUserId());
    }

    @Override
    public PublicLinkDto getPreview(String token) {
        Link link = linksRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Link not found"));

        if (!link.isActive()) {
            throw new RuntimeException("Link is not active");
        }
        if (link.getExpireAt() != null && link.getExpireAt().isBefore(Instant.now())) {
            throw new RuntimeException("Link has expired");
        }

        return switch (link.getType()) {
            case WISHLIST_SHARE -> buildWishlistPublicLinkDto(link);
            case GROUP_INVITE -> buildGroupPublicLinkDto(link);
            default -> throw new IllegalArgumentException("Unsupported link type: " + link.getType());
        };
    }

    @Override
    public String generateToken() {
        byte[] bytes = new byte[18];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private PublicLinkDto buildWishlistPublicLinkDto(Link link) {
        Wishlist wishlist = wishlistRepository.findById(link.getEntityId())
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return PublicLinkDto.builder()
                .type(LinkType.WISHLIST_SHARE.name())
                .entityId(wishlist.getId())
                .title(wishlist.getName())
                .wishes(wishlist.getWishes().stream()
                        .map(wish -> new WishDto(
                                wish.getId(),
                                wish.getTitle(),
                                wish.getDescription(),
                                wish.getColor(),
                                wishlist.getId(),
                                wish.getImageUrls()
                        ))
                        .toList())
                .build();
    }

    private PublicLinkDto buildGroupPublicLinkDto(Link link) {
        Group group = groupRepository.findById(link.getEntityId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        return PublicLinkDto.builder()
                .type(LinkType.GROUP_INVITE.name())
                .entityId(group.getId())
                .title(group.getName())
                .users(group.getMembers().stream()
                        .map(user -> new TelegramUser(
                                user.getTelegramId(),
                                user.getUsername(),
                                user.getPhoto_url(),
                                user.getFirstName(),
                                user.getLastName(),
                                user.getHobbies(),
                                user.getInterests()
                        ))
                        .toList())
                .build();
    }
}

package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.*;
import ru.serp.corpwish.entity.*;
import ru.serp.corpwish.repository.GroupRepository;
import ru.serp.corpwish.repository.LinksRepository;
import ru.serp.corpwish.repository.WishlistRepository;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LinkServiceImpl implements LinkService {

    private final LinksRepository linksRepository;
    private final GroupRepository groupRepository;
    private final WishlistRepository wishlistRepository;

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
                .type(savedInviteLink.getType())
                .entityId(savedInviteLink.getEntityId())
                .createdAt(savedInviteLink.getCreatedAt())
                .expiresAt(savedInviteLink.getExpireAt())
                .active(savedInviteLink.isActive())
                .build();
    }

    @Override
    public GroupDto joinGroup(String token, User user) {
        Link link = linksRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Link not found"));

        if (!link.isActive() || link.getType() != LinkType.GROUP_INVITE) {
            throw new RuntimeException("Invalid or inactive link");
        }
        if (link.getExpireAt() != null && link.getExpireAt().isBefore(Instant.now())) {
            throw new RuntimeException("Link expired");
        }
        if (user == null) {
            throw new RuntimeException("No user provided to join");
        }

        Group group = groupRepository.findById(link.getEntityId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (group.getMembers().stream().noneMatch(u -> u.equals(user))) {
            group.getMembers().add(user);
            groupRepository.save(group);
        }

        return convertGroupToDto(group);
    }

    @Override
    public PublicLinkDto getPreview(String token) {
        Link link = linksRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Link not found"));

        if (!link.isActive() || (link.getExpireAt() != null && link.getExpireAt().isBefore(Instant.now()))) {
            throw new RuntimeException("Link expired or inactive");
        }

        if (link.getType() == LinkType.WISHLIST_SHARE) {
            Wishlist wishlist = wishlistRepository.findById(link.getEntityId())
                    .orElseThrow(() -> new RuntimeException("Wishlist not found"));

            return PublicLinkDto.builder()
                    .type(LinkType.WISHLIST_SHARE)
                    .entityId(wishlist.getId()).title(wishlist.getName())
                    .description(null)
                    .wishes(wishlist.getWishes().stream()
                            .map(wish -> new WishDto(
                                    wish.getId(), wish.getTitle(), wish.getDescription(), wishlist.getId()
                            ))
                            .toList())
                    .build();
        }
        else {
            Group group = groupRepository.findById(link.getEntityId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));

            return PublicLinkDto.builder()
                    .type(LinkType.GROUP_INVITE)
                    .entityId(group.getId())
                    .title(group.getName())
                    .description(null)
                    .users(group.getMembers().stream()
                            .map(user -> new TelegramUser(
                                    user.getTelegramId(), user.getUsername(), user.getFirstName(), user.getLastName())
                            ).toList())
                    .build();
        }
    }

    @Override
    public String generateToken() {
        byte[] bytes = new byte[18];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    // TODO: Вынести подобную логику в отдельный класс
    private GroupDto convertGroupToDto(Group group){
        GroupDto groupDto = new GroupDto();

        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setMembers(
                group.getMembers().stream()
                        .map(this::convertToTelegramUser)
                        .collect(Collectors.toList())
        );

        return groupDto;
    }

    private TelegramUser convertToTelegramUser(User user){
        TelegramUser telegramUser = new TelegramUser();

        telegramUser.setId(user.getTelegramId());
        telegramUser.setUsername(user.getUsername());
        telegramUser.setFirstName(user.getFirstName());
        telegramUser.setLastName(user.getLastName());

        return telegramUser;
    }
}

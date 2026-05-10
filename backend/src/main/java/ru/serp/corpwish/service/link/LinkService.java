package ru.serp.corpwish.service.link;

import ru.serp.corpwish.DTO.group.GroupDto;
import ru.serp.corpwish.DTO.link.InviteLinkDto;
import ru.serp.corpwish.DTO.link.PublicLinkDto;
import ru.serp.corpwish.entity.LinkType;
import ru.serp.corpwish.entity.User;

import java.time.Instant;

public interface LinkService {
    InviteLinkDto createLink( User owner,
                              LinkType type,
                              Long entityId,
                              Instant expiresAt,
                              String baseUrl);
    GroupDto joinGroup(String token, User user);
    PublicLinkDto getPreview(String token);
    String generateToken();
}

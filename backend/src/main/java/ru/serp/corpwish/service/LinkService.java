package ru.serp.corpwish.service;

import ru.serp.corpwish.DTO.GroupDto;
import ru.serp.corpwish.DTO.InviteLinkDto;
import ru.serp.corpwish.DTO.PublicLinkDto;
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

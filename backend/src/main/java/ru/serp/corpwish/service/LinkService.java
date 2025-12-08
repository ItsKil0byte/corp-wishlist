package ru.serp.corpwish.service;

import ru.serp.corpwish.DTO.GroupDto;
import ru.serp.corpwish.DTO.InviteLinkDto;
import ru.serp.corpwish.DTO.PublicLinkDto;

public interface LinkService {
    InviteLinkDto createLink();
    GroupDto joinGroup();
    PublicLinkDto getPreview();
}

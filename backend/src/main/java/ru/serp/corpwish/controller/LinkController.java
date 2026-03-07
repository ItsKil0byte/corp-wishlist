package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.link.CreateLinkRequest;
import ru.serp.corpwish.DTO.link.InviteLinkDto;
import ru.serp.corpwish.entity.LinkType;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.LinkService;

@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    @PostMapping
    public ResponseEntity<InviteLinkDto> createLink(
            @AuthenticationPrincipal User user,
            @RequestBody CreateLinkRequest request,
            @RequestHeader(value = "X-Base-Url", required = false) String baseUrl
    ) {
        String url = (baseUrl != null) ? baseUrl : "localhost:8080";

        InviteLinkDto dto = linkService.createLink(
                user,
                LinkType.valueOf(request.getType()),
                request.getEntityId(),
                request.getExpiresAt(),
                url
        );

        return ResponseEntity.ok(dto);
    }
}

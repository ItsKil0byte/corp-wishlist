package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.group.GroupDto;
import ru.serp.corpwish.DTO.link.PublicLinkDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.link.LinkService;

@RestController
@RequestMapping("/public/link")
@RequiredArgsConstructor
public class PublicLinkController {

    private final LinkService linkService;

    @GetMapping("/{token}")
    public ResponseEntity<PublicLinkDto> preview(@PathVariable String token) {
        PublicLinkDto dto = linkService.getPreview(token);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{token}/join")
    public ResponseEntity<GroupDto> joinGroupByToken(
            @PathVariable String token,
            @AuthenticationPrincipal User user
    ) {
        GroupDto dto = linkService.joinGroup(token, user);
        return ResponseEntity.ok(dto);
    }
}

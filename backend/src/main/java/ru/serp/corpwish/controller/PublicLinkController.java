package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serp.corpwish.DTO.PublicLinkDto;
import ru.serp.corpwish.service.LinkService;

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
}

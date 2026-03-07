package ru.serp.corpwish.DTO.link;

import lombok.Data;

import java.time.Instant;

@Data
public class CreateLinkRequest {
    private String type;
    private Long entityId;
    private Instant expiresAt;
}

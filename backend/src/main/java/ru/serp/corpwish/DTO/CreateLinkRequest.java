package ru.serp.corpwish.DTO;

import lombok.Data;
import ru.serp.corpwish.entity.LinkType;

import java.time.Instant;

@Data
public class CreateLinkRequest {
    private String type;
    private Long entityId;
    private Instant expiresAt;
}

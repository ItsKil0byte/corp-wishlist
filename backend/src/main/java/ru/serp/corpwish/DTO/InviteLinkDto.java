package ru.serp.corpwish.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serp.corpwish.entity.LinkType;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InviteLinkDto {
    private String token;
    private String url; // Полная URL для пользователя
    private LinkType type;
    private Long entityId;
    private Instant createdAt;
    private Instant expiresAt;
    private boolean active;
}
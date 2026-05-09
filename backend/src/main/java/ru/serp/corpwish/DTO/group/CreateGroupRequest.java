package ru.serp.corpwish.DTO.group;

import lombok.Data;

@Data
public class CreateGroupRequest {
    // Required
    private String name;

    // Optional
    private String icon;
}

package ru.serp.corpwish.DTO;

import lombok.Data;

@Data
public class CreateGroupRequest {
    // Required
    private String name;

    // Optional
    private String icon;
}

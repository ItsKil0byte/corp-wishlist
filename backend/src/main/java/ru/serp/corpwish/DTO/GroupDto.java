package ru.serp.corpwish.DTO;

import lombok.Data;

import java.util.List;

@Data
public class GroupDto {
    private Long id;
    private String name;
    private String icon;
    private List<TelegramUser> members;
}

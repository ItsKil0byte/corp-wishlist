package ru.serp.corpwish.DTO.group;

import lombok.Data;
import ru.serp.corpwish.DTO.user.UserInfo;

import java.util.List;

@Data
public class GroupDto {
    private Long id;
    private String name;
    private String icon;
    private List<UserInfo> members;
}

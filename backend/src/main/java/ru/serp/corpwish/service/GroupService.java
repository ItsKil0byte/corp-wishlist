package ru.serp.corpwish.service;

import ru.serp.corpwish.DTO.CreateGroupRequest;
import ru.serp.corpwish.DTO.GroupDto;

import java.util.List;

public interface GroupService {
    GroupDto createGroup(Long userId, CreateGroupRequest groupData);
    GroupDto updateGroup(Long groupId, Long userId, GroupDto newGroupData);
    List<GroupDto> getGroups(Long userId);
    GroupDto getGroup(Long groupId, Long userId);
    void deleteGroup(Long groupId, Long ownerId);
}

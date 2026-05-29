package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serp.corpwish.DTO.group.CreateGroupRequest;
import ru.serp.corpwish.DTO.group.GroupDto;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.service.group.GroupService;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<List<GroupDto>> getGroups (
            @AuthenticationPrincipal User user
    ) {
        List<GroupDto> groups = groupService.getGroups(user.getId());

        return ResponseEntity.ok(groups);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDto> getGroup (
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId
    ) {
        GroupDto group = groupService.getGroup(groupId, user.getId());

        return ResponseEntity.ok(group);
    }

    @PostMapping
    public ResponseEntity<GroupDto> createGroup (
            @AuthenticationPrincipal User user,
            @RequestBody CreateGroupRequest groupRequest
    ) {
        GroupDto groupDto = groupService.createGroup(user.getId(), groupRequest);

        return ResponseEntity.ok(groupDto);
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDto> updateGroup (
            @AuthenticationPrincipal User owner,
            @PathVariable Long groupId,
            @RequestBody CreateGroupRequest createGroupRequest
    ) {
        GroupDto groupDto = groupService.updateGroup(groupId, owner.getId(), createGroupRequest);

        return ResponseEntity.ok(groupDto);
    }

    @PutMapping("/{groupId}/member/{userId}")
    public ResponseEntity<GroupDto> joinGroup(
            @AuthenticationPrincipal User requester,
            @PathVariable Long groupId,
            @PathVariable Long userId
    ) {
        GroupDto groupDto = groupService.joinGroup(groupId, userId, requester.getId());

        return ResponseEntity.ok(groupDto);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(
            @AuthenticationPrincipal User owner,
            @PathVariable Long groupId
    ) {
        groupService.deleteGroup(groupId, owner.getId());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{groupId}/member/{userId}")
    public ResponseEntity<GroupDto> leaveGroup(
            @AuthenticationPrincipal User requester,
            @PathVariable Long groupId,
            @PathVariable Long userId
    ) {
        GroupDto groupDto = groupService.leaveGroup(groupId, userId, requester.getId());

        return ResponseEntity.ok(groupDto);
    }
}

package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.CreateGroupRequest;
import ru.serp.corpwish.DTO.GroupDto;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.entity.Group;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.GroupRepository;
import ru.serp.corpwish.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public GroupDto createGroup(Long userId, CreateGroupRequest groupData) {
        User user = userRepository.findByTelegramId(userId)
                .orElseThrow(() -> new RuntimeException("Can not create group - User not found"));

        Group group = new Group();

        group.setName(groupData.getName());
        group.setOwner(user);

        groupRepository.save(group);
        return convertToDto(group);
    }

    @Override
    public GroupDto updateGroup(Long groupId, Long userId, GroupDto newGroupData) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not update group - group not found"));

        if(!group.getOwner().getTelegramId().equals(userId)){
            throw new RuntimeException("Can not update group - user is not an owner");
        }

        group.setName(newGroupData.getName());
        groupRepository.save(group);

        return convertToDto(group);
    }

    @Override
    public List<GroupDto> getGroups(Long userId) {
        User user = userRepository.findByTelegramId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get groups - User not found"));

        List<Group> allGroups = groupRepository.findAll();

        return allGroups.stream()
                .filter(group -> group.getOwner().getTelegramId().equals(userId) ||
                        group.getMembers().stream()
                                .anyMatch(member -> member.getTelegramId().equals(userId))
                )
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public GroupDto getGroup(Long groupId, Long userId) {
        User user = userRepository.findByTelegramId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get group - User not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not get group - group not found"));

        boolean isOwner = group.getOwner().getTelegramId().equals(userId);
        boolean isMember = group.getMembers().stream()
                .anyMatch(member -> member.getTelegramId().equals(userId));

        if(!isOwner && !isMember){
            throw new RuntimeException("Access denied to this group");
        }

        return convertToDto(group);
    }

    @Override
    public void deleteGroup(Long groupId, Long ownerId) {
        User user = userRepository.findByTelegramId(ownerId)
                .orElseThrow(() -> new RuntimeException("Can not delete group - owner not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not delete group - group not found"));

        if(!group.getOwner().getTelegramId().equals(ownerId)){
            throw new RuntimeException("Can not delete group - user is not an owner");
        }

        groupRepository.delete(group);
    }

    private GroupDto convertToDto(Group group){
        GroupDto groupDto = new GroupDto();

        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setMembers(
                group.getMembers().stream()
                        .map(this::convertToTelegramUser)
                        .collect(Collectors.toList())
        );

        return groupDto;
    }

    private TelegramUser convertToTelegramUser(User user){
        TelegramUser telegramUser = new TelegramUser();

        telegramUser.setId(user.getTelegramId());
        telegramUser.setUsername(user.getUsername());
        telegramUser.setFirstName(user.getFirstName());
        telegramUser.setLastName(user.getLastName());

        return telegramUser;
    }
}

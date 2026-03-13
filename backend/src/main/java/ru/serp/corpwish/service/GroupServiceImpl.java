package ru.serp.corpwish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.DTO.CreateGroupRequest;
import ru.serp.corpwish.DTO.GroupDto;
import ru.serp.corpwish.DTO.TelegramUser;
import ru.serp.corpwish.DTO.UserInfo;
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
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not create group - User not found"));

        Group group = new Group();

        group.setName(groupData.getName());
        group.setIcon(groupData.getIcon());
        group.setOwner(user);

        groupRepository.save(group);
        return convertToDto(group);
    }

    @Override
    public GroupDto updateGroup(Long groupId, Long userId, CreateGroupRequest newGroupData) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not update group - group not found"));

        if(!group.getOwner().getUserId().equals(userId)){
            throw new RuntimeException("Can not update group - user is not an owner");
        }

        group.setName(newGroupData.getName());
        group.setIcon(newGroupData.getIcon());
        groupRepository.save(group);

        return convertToDto(group);
    }

    @Override
    public List<GroupDto> getGroups(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get groups - User not found"));

        List<Group> allGroups = groupRepository.findAll();

        return allGroups.stream()
                .filter(group -> group.getOwner().getUserId().equals(userId) ||
                        group.getMembers().stream()
                                .anyMatch(member -> member.getUserId().equals(userId))
                )
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public GroupDto getGroup(Long groupId, Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not get group - User not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not get group - group not found"));

        boolean isOwner = group.getOwner().getUserId().equals(userId);
        boolean isMember = group.getMembers().stream()
                .anyMatch(member -> member.getUserId().equals(userId));

        if(!isOwner && !isMember){
            throw new RuntimeException("Access denied to this group");
        }

        return convertToDto(group);
    }

    @Override
    public void deleteGroup(Long groupId, Long ownerId) {
        User user = userRepository.findByUserId(ownerId)
                .orElseThrow(() -> new RuntimeException("Can not delete group - owner not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not delete group - group not found"));

        if(!group.getOwner().getUserId().equals(ownerId)){
            throw new RuntimeException("Can not delete group - user is not an owner");
        }

        groupRepository.delete(group);
    }

    @Override
    public GroupDto leaveGroup(Long groupId, Long userId, Long requesterId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not leave group - user not found"));

        if(!user.getUserId().equals(requesterId)){
            throw new RuntimeException("Can not join group - User is not a requester");
        }

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not leave group - group not found"));

        if(group.getOwner().getUserId().equals(userId)){
            throw new RuntimeException("Owner can not leave his group"); //Пока так, пусть он может только удалять
        }

        group.getMembers().removeIf(member -> member.getUserId().equals(userId));

        groupRepository.save(group);

        return convertToDto(group);
    }

    @Override
    public GroupDto joinGroup(Long groupId, Long userId, Long requesterId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Can not join group - user not found"));

        if(!user.getUserId().equals(requesterId)){
            throw new RuntimeException("Can not join group - User is not a requester");
        }

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Can not join group - group not found"));

        if(group.getMembers().stream().anyMatch(member -> member.getUserId().equals(userId))){
            throw new RuntimeException("Can nor join group - this user already in this group");
        }

        group.getMembers().add(user);
        groupRepository.save(group);

        return convertToDto(group);
    }

    private GroupDto convertToDto(Group group){
        GroupDto groupDto = new GroupDto();

        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setIcon(group.getIcon());
        groupDto.setMembers(
                group.getMembers().stream()
                        .map(this::convertToUserInfo)
                        .collect(Collectors.toList())
        );

        return groupDto;
    }

    private UserInfo convertToUserInfo(User user){
        UserInfo userInfo = new UserInfo();

        userInfo.setUserId(user.getUserId());
        userInfo.setTelegramId(user.getTelegramId());
        userInfo.setUsername(user.getUsername());
        userInfo.setFirstName(user.getFirstName());
        userInfo.setLastName(user.getLastName());
        userInfo.setPhoto_url(user.getPhoto_url());
        userInfo.setHobbies(user.getHobbies());
        userInfo.setInterests(user.getInterests());

        return userInfo;
    }

    private TelegramUser convertToTelegramUser(User user){
        TelegramUser telegramUser = new TelegramUser();

        telegramUser.setId(user.getTelegramId());
        telegramUser.setPhoto_url(user.getPhoto_url());
        telegramUser.setUsername(user.getUsername());
        telegramUser.setFirstName(user.getFirstName());
        telegramUser.setLastName(user.getLastName());

        return telegramUser;
    }
}

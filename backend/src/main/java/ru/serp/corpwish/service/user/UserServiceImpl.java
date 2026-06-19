package ru.serp.corpwish.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.serp.corpwish.DTO.user.UserInfo;
import ru.serp.corpwish.entity.User;
import ru.serp.corpwish.repository.UserRepository;
import ru.serp.corpwish.service.file.FileService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileService fileService;

    @Override
    public UserDetails loadUserByUsername(String userIDStr) throws UsernameNotFoundException {
        Long userID = Long.parseLong(userIDStr);
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с id " + userIDStr + " не найден."));

        //Возможно добавление AccountExpired() и подобных в будущем
        return user;
    }

    @Override
    public UserInfo getUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Can not get user info - no such user"));

        return convertToUserInfo(user);
    }

    @Override
    public UserInfo updateUserInfo(Long ownerId, UserInfo userInfo) {
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Can not update user info - no such user"));

        User newUserInfo = updateUser(user, userInfo);

        userRepository.save(newUserInfo);

        return convertToUserInfo(newUserInfo);
    }

    @Override
    public UserInfo uploadAvatar(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Can not upload avatar - No such user"));
        if (user.getPhoto_url() != null) {
            fileService.delete(user.getPhoto_url());
        }
        user.setPhoto_url(fileService.store(file));
        return convertToUserInfo(userRepository.save(user));
    }

    @Override
    public void deleteAvatar(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Can not upload avatar - No such user"));
        if (user.getPhoto_url() != null) {
            fileService.delete(user.getPhoto_url());
            user.setPhoto_url(null);
            userRepository.save(user);
        }
    }

    private User updateUser(User user, UserInfo newUserInfo){
        user.setUsername(newUserInfo.getUsername());
        user.setPhoto_url(newUserInfo.getPhoto_url());
        user.setFirstName(newUserInfo.getFirstName());
        user.setLastName(newUserInfo.getLastName());
        user.setHobbies(newUserInfo.getHobbies());
        user.setInterests(newUserInfo.getInterests());

        return user;
    }

    private UserInfo convertToUserInfo(User user){
        UserInfo userInfo = new UserInfo();

        userInfo.setUserId(user.getId());
        userInfo.setUsername(user.getLogin());
        userInfo.setFirstName(user.getFirstName());
        userInfo.setLastName(user.getLastName());
        userInfo.setPhoto_url(user.getProfilePicUrl());
        userInfo.setInterests(user.getInterests());
        userInfo.setHobbies(user.getHobbies());

        return userInfo;
    }
}


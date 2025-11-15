package ru.serp.corpwish.users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User get(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public User update(Long id, User update) {
        User user = get(id);

        user.setLogin(update.getLogin());
        user.setPassword(update.getPassword());
        user.setFirstName(update.getFirstName());
        user.setLastName(update.getLastName());
        user.setMiddleName(update.getMiddleName());

        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}

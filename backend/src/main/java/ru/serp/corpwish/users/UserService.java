package ru.serp.corpwish.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User get(Long id) {
        return userRepository.findById(id).orElseThrow(
                /*
                TODO: Возможно в будущем, с появлением новых исключений стоит это
                 всё перенести в отдельный глобальный котроллер
                 */

                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User " + id + " not found"
                )
        );
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

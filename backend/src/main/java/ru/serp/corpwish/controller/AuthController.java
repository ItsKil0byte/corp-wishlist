package ru.serp.corpwish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serp.corpwish.dto.LoginDTO;
import ru.serp.corpwish.dto.RegistrationDTO;
import ru.serp.corpwish.service.JWTService;
import ru.serp.corpwish.users.User;
import ru.serp.corpwish.users.UserRepository;
import ru.serp.corpwish.users.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder,
                          UserRepository userRepository, AuthenticationManager authenticationManager,
                          JWTService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegistrationDTO request){
//        if(userRepository.existsByLogin(request.getLogin())){
//            return ResponseEntity.badRequest().body("Логин уже используется");
//        }

        User user = new User();
        // user.setLogin(request.getLogin());
        user.setFirstName(request.getFirstName());
        // user.setMiddleName(request.getMiddleName());
        user.setLastName(request.getLastName());
        // user.setPassword(passwordEncoder.encode(request.getPassword()));

        userService.create(user);

        return ResponseEntity.ok("Регистрация успешна");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginDTO request){
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getLogin(),
                            request.getPassword()
                    )
            );
            String jwt = jwtService.generateToken((UserDetails) auth.getPrincipal());

            return ResponseEntity.ok("Логин успешен"); //TODO JWTResponse, реализация JWTFilter
        }
        catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверные учетные данные");
        }
    }
}

package ru.serp.corpwish.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.serp.corpwish.users.User;
import ru.serp.corpwish.users.UserRepository;

import java.util.List;

//@Service
//public class UserDetail implements UserDetailsService {
//    @Autowired
//    UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByLogin(username);
//        if(user == null){
//            throw new UsernameNotFoundException("User not exists by login");
//        }
//        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), List.of(
//                new SimpleGrantedAuthority("ROLE_USER")
//        ));
//    }
//}

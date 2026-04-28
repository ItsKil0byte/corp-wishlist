package ru.serp.corpwish.entity;

import jakarta.persistence.*;

import java.util.*;
import java.util.stream.Collectors;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "login", unique = true)
    private String login;

    @Column(name = "passwordHash")
    private String passwordHash;

    @Column(name = "telegramId", unique = true)
    private Long telegramId;

    @Column(name = "username")
    private String username;

    @Column(name = "picture")
    private String photo_url;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "hobbies")
    private String hobbies;

    @Column(name = "interests")
    private String interests;

    @ManyToMany(mappedBy = "members")
    private List<Group> groups = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles = new HashSet<>(Set.of("USER"));

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles
            .stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toSet());
    }

    public String getProfilePicUrl() {
        return this.photo_url != null ? "/uploads/" + this.photo_url : null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

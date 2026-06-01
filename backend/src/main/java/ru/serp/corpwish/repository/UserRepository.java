package ru.serp.corpwish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serp.corpwish.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByLogin(String login);
    boolean existsByLogin(String login);
    Optional<User> findById(Long id);
    @Query("""
        SELECT u FROM User u 
        WHERE u.photo_url = :filename
        """)
    Optional<User> findByPhotoUrl(@Param("filename") String filename);
}

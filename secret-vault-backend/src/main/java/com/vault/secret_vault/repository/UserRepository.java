package com.vault.secret_vault.repository;

import com.vault.secret_vault.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Change findByEmail to findByUsername
    Optional<User> findByUsername(String username);
}
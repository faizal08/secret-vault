package com.vault.secret_vault.repository;

import com.vault.secret_vault.entity.Secret;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecretRepository extends JpaRepository<Secret, Long> {
    // Finds all secrets belonging to a specific user ID
    List<Secret> findByUserId(Long userId);
}
package com.vault.secret_vault.controller;

import com.vault.secret_vault.entity.Secret;
import com.vault.secret_vault.entity.User;
import com.vault.secret_vault.repository.SecretRepository;
import com.vault.secret_vault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vault.secret_vault.dto.SecretRequest;

import java.util.List;

@RestController
@RequestMapping("/api/secrets")
@CrossOrigin(origins = "http://localhost:5173") // Allow React to talk to this controller
public class SecretController {

    private final SecretRepository secretRepository;
    private final UserRepository userRepository;

    // Manual Constructor (No Lombok @RequiredArgsConstructor)
    public SecretController(SecretRepository secretRepository, UserRepository userRepository) {
        this.secretRepository = secretRepository;
        this.userRepository = userRepository;
    }

    // 1. POST: Save a new secret
    @PostMapping("/add")
    public ResponseEntity<?> addSecret(@RequestBody SecretRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Secret secret = new Secret(request.getTitle(), request.getContent(), user);
        secretRepository.save(secret);

        return ResponseEntity.ok("Secret secured in the vault!");
    }

    // 2. GET: Fetch all secrets for a specific user
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Secret>> getMySecrets(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Secret> secrets = secretRepository.findByUserId(user.getId());
        return ResponseEntity.ok(secrets);
    }

    // Add this inside your SecretController class
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSecret(@PathVariable Long id) {
        secretRepository.deleteById(id);
        return ResponseEntity.ok("Secret destroyed successfully.");
    }
}
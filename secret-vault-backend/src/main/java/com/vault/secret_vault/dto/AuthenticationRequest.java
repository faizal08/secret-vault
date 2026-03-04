package com.vault.secret_vault.dto;
import lombok.*;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class AuthenticationRequest {
    private String username;
    private String password;
}
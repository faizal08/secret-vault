package com.vault.secret_vault.dto;
import lombok.*;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class AuthenticationResponse {
    private String token;
}
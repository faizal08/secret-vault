package com.vault.secret_vault.dto;

public class AuthenticationResponse {
    private String token;

    // Standard Constructor
    public AuthenticationResponse() {}

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    // Manual Getter and Setter
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
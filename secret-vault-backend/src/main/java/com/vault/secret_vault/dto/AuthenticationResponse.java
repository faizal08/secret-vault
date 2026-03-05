package com.vault.secret_vault.dto;

public class AuthenticationResponse {
    private String token;
    private String username; // Add this to match React's needs

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
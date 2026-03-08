package com.vault.secret_vault.dto;

public class SecretRequest {
    private String title;
    private String content;
    private String username;

    // Default Constructor
    public SecretRequest() {}

    // Parameterized Constructor
    public SecretRequest(String title, String content, String username) {
        this.title = title;
        this.content = content;
        this.username = username;
    }

    // Manual Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
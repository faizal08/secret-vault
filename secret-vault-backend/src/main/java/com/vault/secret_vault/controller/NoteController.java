package com.vault.secret_vault.controller;

import com.vault.secret_vault.entity.Note;
import com.vault.secret_vault.entity.User;
import com.vault.secret_vault.repository.NoteRepository;
import com.vault.secret_vault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    // GET all notes for the LOGGED-IN user
    @GetMapping
    public ResponseEntity<List<Note>> getMyNotes() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(noteRepository.findAllByUser(user));
    }

    // CREATE a new note for the LOGGED-IN user
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody String content) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Note note = Note.builder()
                .content(content)
                .user(user)
                .build();

        return ResponseEntity.ok(noteRepository.save(note));
    }
}
package com.vault.secret_vault.controller;

import com.vault.secret_vault.entity.Note;
import com.vault.secret_vault.entity.User;
import com.vault.secret_vault.repository.NoteRepository;
import com.vault.secret_vault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173") // Ensure React can access this
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    // MANUAL CONSTRUCTOR for Dependency Injection
    public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getMyNotes() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(noteRepository.findAllByUser(user));
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        // Use standard 'new' and 'set' instead of .builder()
        Note note = new Note();
        note.setContent(request.getContent());
        note.setUser(user);

        return ResponseEntity.ok(noteRepository.save(note));
    }
}
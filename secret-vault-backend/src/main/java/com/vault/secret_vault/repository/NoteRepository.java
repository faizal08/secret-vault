package com.vault.secret_vault.repository;

import com.vault.secret_vault.entity.Note;
import com.vault.secret_vault.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    // This will fetch only the notes belonging to a specific user
    List<Note> findAllByUser(User user);
}
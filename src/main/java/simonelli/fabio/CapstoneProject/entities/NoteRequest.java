package simonelli.fabio.CapstoneProject.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
public class NoteRequest {
    @Id
    @GeneratedValue
    private UUID id;
    private String details;
    private LocalDateTime date;
    @ManyToOne
    private User user;

    public NoteRequest(String details, User user) {
        this.details = details;
        this.date = LocalDateTime.now();
        this.user = user;
    }

    public NoteRequest() {
        this.date = LocalDateTime.now();
    }
}

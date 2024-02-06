package simonelli.fabio.CapstoneProject.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue
    private UUID id;

    private LocalDateTime date;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    public Like() {
        this.date = LocalDateTime.now();
    }
}

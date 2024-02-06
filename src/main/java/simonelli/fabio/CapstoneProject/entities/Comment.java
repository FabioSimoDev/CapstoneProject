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
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue
    private UUID id;
    private String content;
    private LocalDateTime date;
    @ManyToOne
    private User user;
    @ManyToOne
    private Post post;

    public Comment() {
        this.date = LocalDateTime.now();
    }
}

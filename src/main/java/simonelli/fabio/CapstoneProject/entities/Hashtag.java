package simonelli.fabio.CapstoneProject.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Hashtag {
    @Id
    @GeneratedValue
    private UUID id;
    @Column(unique = true)
    private String hashtagText;
    @ManyToMany(mappedBy = "hashtags")
    private Set<Post> posts = new HashSet<>();

    public Hashtag() {
    }

    public Hashtag(String hashtagText) {
        this.hashtagText = hashtagText;
    }
}

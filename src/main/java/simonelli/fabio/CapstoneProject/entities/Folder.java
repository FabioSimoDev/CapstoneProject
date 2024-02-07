package simonelli.fabio.CapstoneProject.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Folder {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    @ManyToOne
    private User user;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    private Set<Post> posts = new HashSet<>();
    private LocalDateTime date;

    public Folder() {
        this.date = LocalDateTime.now();
    }

    public void addPost(Post post){
        this.posts.add(post);
    }
}

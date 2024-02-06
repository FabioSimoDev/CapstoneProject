package simonelli.fabio.CapstoneProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private UUID id;
    private String title;
    private String content;
    private String imageURL;
    private LocalDateTime publishDate;
    @JsonIgnore
    @ManyToOne
    private User user;
    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Like> likes;
    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
    @ManyToMany
    @JoinTable(
            name = "post_hashtags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id")
    )
    @JsonIgnore
    private Set<Hashtag> hashtags = new HashSet<>();

    public Post(UUID id, String title, String content, String imageURL, LocalDateTime publishDate, User user, List<Like> likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageURL = imageURL;
        this.publishDate = publishDate;
        this.user = user;
        this.likes = likes;
    }

    public Post() {
        this.publishDate = LocalDateTime.now();
    }

    public void addHashtag(Hashtag hashtag){
        this.hashtags.add(hashtag);
    }

    public void removeHashtag(Hashtag hashtag){
        this.hashtags.remove(hashtag);
    }
}

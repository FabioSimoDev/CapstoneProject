package simonelli.fabio.CapstoneProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.enums.ROLE;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "users")
@JsonIgnoreProperties({"accountNonExpired", "credentialsNonExpired", "enabled", "accountNonLocked", "authorities", "password", "role", "posts", "folders", "comments", "likes", "noteRequests", "followers", "following"})
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    @Enumerated(EnumType.STRING)
    private ROLE role;
    private String email;
    private String username;
    @Column(columnDefinition = "text")
    private String avatarURL;
    private String phoneNumber;
    private String password;
    private LocalDateTime signUpDate;
    private String biography;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Like> likes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Folder> folders = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Reputation reputation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<NoteRequest> noteRequests;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followers = new HashSet<>();

    @ManyToMany(mappedBy = "followers")
    private Set<User> following = new HashSet<>();

    private int followersCount = 0;

    private int followingCount = 0;

    public User() {
        this.signUpDate = LocalDateTime.now();
        this.posts = new ArrayList<>();
        this.likes = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.noteRequests = new HashSet<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void addPost(Post post) {
        this.posts.add(post);
    }

    public void addLike(Like like) {
        this.likes.add(like);
    }

    public void removeLike(Like like){
        this.likes.remove(like);
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addFolder(Folder folder) {
        this.folders.add(folder);
    }

    public void addNoteRequest(NoteRequest noteRequest) {
        this.noteRequests.add(noteRequest);
    }

    public void follow(User userToFollow) {
        following.add(userToFollow);
        userToFollow.followers.add(this);
    }

    public void unfollow(User userToUnfollow) {
        following.remove(userToUnfollow);
        userToUnfollow.followers.remove(this);
    }
}

package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostsDAO extends JpaRepository<Post, UUID> {
    public List<Post> findByUser(User user);

    public Page<Post> findByHashtags_HashtagText(String hashtagText, Pageable pageable);
}

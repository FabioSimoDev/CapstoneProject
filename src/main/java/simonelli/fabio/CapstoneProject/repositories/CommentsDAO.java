package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Comment;
import simonelli.fabio.CapstoneProject.entities.User;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentsDAO extends JpaRepository<Comment, UUID> {
    public Page<Comment> findByUser(User user, Pageable pageable);
    public Page<Comment> findByPostId(UUID postId, Pageable pageable);
    public Page<Comment> findByUserAndPostId(User user, UUID postId, Pageable pageable);
    public long countByPostId(UUID postId);
}

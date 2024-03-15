package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Like;

import java.util.List;
import java.util.UUID;

@Repository
public interface LikesDAO extends JpaRepository<Like, UUID> {
    public Page<Like> findAllByUserId(UUID userId, Pageable pageable);
    public boolean existsByUserIdAndPostId(UUID userId, UUID postId);

    public long countByPostId(UUID postId);

    public Like findByUserIdAndPostId(UUID userId, UUID postId);
}

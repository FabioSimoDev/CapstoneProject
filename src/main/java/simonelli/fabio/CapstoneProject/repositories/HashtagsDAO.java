package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Hashtag;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HashtagsDAO extends JpaRepository<Hashtag, UUID> {
    public Optional<Hashtag> findByHashtagText(String text);

    public Page<Hashtag> findByPostsId(UUID postsId, Pageable pageable);
}

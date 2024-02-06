package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Post;

import java.util.UUID;

@Repository
public interface PostsDAO extends JpaRepository<Post, UUID> {
}

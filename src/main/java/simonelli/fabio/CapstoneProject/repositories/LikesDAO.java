package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Like;

import java.util.UUID;

@Repository
public interface LikesDAO extends JpaRepository<Like, UUID> {
}

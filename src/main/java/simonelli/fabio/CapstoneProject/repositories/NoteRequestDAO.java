package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.NoteRequest;
import simonelli.fabio.CapstoneProject.entities.User;

import java.util.UUID;

@Repository
public interface NoteRequestDAO extends JpaRepository<NoteRequest, UUID> {
    public Page<NoteRequest> findByUser(User user, Pageable pageable);
}

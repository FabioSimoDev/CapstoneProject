package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import simonelli.fabio.CapstoneProject.entities.Reputation;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.payloads.ReputationDTO;

import java.util.Optional;
import java.util.UUID;

public interface ReputationDAO extends JpaRepository<Reputation, UUID> {
    public Optional<Reputation> findByUserId(UUID userId);
}

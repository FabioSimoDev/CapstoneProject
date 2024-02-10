package simonelli.fabio.CapstoneProject.payloads;

import java.util.UUID;

public record ReputationDTO(UUID id, UUID userId, int points) {
}

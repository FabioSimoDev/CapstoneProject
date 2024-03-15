package simonelli.fabio.CapstoneProject.payloads;

import java.time.LocalDateTime;
import java.util.UUID;

public record FolderDTO(UUID id, UUID userId, String name, LocalDateTime date) {
}

package simonelli.fabio.CapstoneProject.payloads;

import java.time.LocalDateTime;
import java.util.UUID;

public record NoteRequestDTO(UUID id, String details, LocalDateTime date, UUID userId) {
}

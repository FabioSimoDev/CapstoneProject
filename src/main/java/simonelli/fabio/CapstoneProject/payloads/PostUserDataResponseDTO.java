package simonelli.fabio.CapstoneProject.payloads;

import java.util.UUID;

public record PostUserDataResponseDTO(UUID userId, String username, String avatarURL) {
}

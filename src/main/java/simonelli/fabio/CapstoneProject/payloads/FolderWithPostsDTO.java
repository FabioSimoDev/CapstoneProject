package simonelli.fabio.CapstoneProject.payloads;

import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record FolderWithPostsDTO(UUID id,
                                 UUID userId,
                                 String name,
                                 LocalDateTime date,
                                 Page<PostResponseDTO> posts) {
}

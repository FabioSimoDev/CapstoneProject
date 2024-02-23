package simonelli.fabio.CapstoneProject.payloads;

import java.time.LocalDateTime;
import java.util.UUID;

public record PostResponseDTO(UUID id,
                              String title,
                              String content,
                              String image_url,
                              LocalDateTime publishDate,
                              long likeCount,
                              boolean isLiked,
                              long totalComments,
                              PostUserDataResponseDTO creatorData) {
}

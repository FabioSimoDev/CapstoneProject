package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewCommentDTO(@NotEmpty(message = "Il testo del commento non può essere vuoto.")
                            @Size(max = 300, message = "Il commento non deve superare i 40 caratteri")
                            String content) {
}

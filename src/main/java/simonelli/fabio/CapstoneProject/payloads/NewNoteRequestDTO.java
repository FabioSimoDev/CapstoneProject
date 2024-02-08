package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewNoteRequestDTO(@NotEmpty(message = "I dettagli della richiesta non possono essere vuoti o null.")
                                @Size(min = 3, max = 500, message = "I dettagli della richiesta devono essere compresi tra i 3 e i 500 caratteri.")
                                String details) {
}

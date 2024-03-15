package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewPostDTO(@NotEmpty
                         @Size(min = 2, max = 40, message = "Il titolo non deve essere inferiore a 2 caratteri e non deve superare i 40 caratteri")
                         String title,
                         @NotEmpty
                         @Size(max = 300, message = "Il contenuto del post non può superare i 300 caratteri.")
                         String content,
                         String imageURL) {
}

package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewHastagDTO(@NotEmpty(message = "L'hashtag non può essere vuoto")
                           @Size(min = 3, max = 15, message = "Un hashtag non può essere inferiore ai 3 caratteri o maggiore di 15.")
                           String hashtag) {
}

package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UserLoginDTO(@NotEmpty(message = "Inserisci l'email per accedere")
                           @Email
                           String email,
                           @NotEmpty(message = "Inserisci la password per accedere")
                           String password) {
}

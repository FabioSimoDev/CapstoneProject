package simonelli.fabio.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewFolderDTO(@NotEmpty(message = "Inserisci un nome per la cartella")
                           @Size(max = 30, message = "Nome troppo lungo")
                           String name) {
}

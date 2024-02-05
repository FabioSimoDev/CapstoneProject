package simonelli.fabio.CapstoneProject.exceptions;

import java.util.UUID;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }

    public NotFoundException(UUID id){
        super("Elemento con id " + id + " non trovato");
    }
}

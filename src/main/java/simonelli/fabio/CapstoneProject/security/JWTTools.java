package simonelli.fabio.CapstoneProject.security;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.UnauthorizedException;

import java.util.Date;

@Component
public class JWTTools {
    @Value("${spring.jwt.secret}")
    private String secret;

    public String createToken(User user) {
        return Jwts.builder().subject(String.valueOf(user.getId())).// Id utente a cui appartiene il token
                claim("role", user.getRole()).
                issuedAt(new Date(System.currentTimeMillis())) // Data di rilascio del token
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 10)) // Data di scadenza
                .signWith(Keys.hmacShaKeyFor(secret.getBytes())) // Firma del token
                .compact(); // Il token viene compattato in una stringa.
    }

    public void verifyToken(String token) {
        try {
            // Jwts.parser(): Questo è il punto di partenza per il processo di verifica del token JWT.
            // parser() restituisce un oggetto parser che verrà utilizzato per decodificare e verificare il token.
            // .verifyWith(Keys.hmacShaKeyFor(secret.getBytes())): Questo metodo specifica la chiave segreta utilizzata per verificare la firma del token JWT.
            // questa parte del codice indica che si sta utilizzando un algoritmo HMAC-SHA per la firma del token, e la chiave segreta è fornita come un array di byte
            // .build(): Viene chiamato per costruire l'oggetto di verifica del token JWT, che conterrà tutte le informazioni necessarie per verificare il token.
            // .parse(token): Viene utilizzato per analizzare e verificare il token JWT.
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);
        } catch (Exception ex) {
            throw new UnauthorizedException("Sembra che ci siano problemi con il tuo accesso, prova di nuovo.");
        }
    }

    public String extractIdFromToken(String token) {
        return Jwts.parser().
                verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token) // decodifica il token JWT e verifica la sua firma utilizzando la chiave segreta. Restituirà un oggetto che rappresenta le informazioni contenute nel token.
                .getPayload() // una volta ottenuto l'oggetto, sto accedendo al payload del token, che contiene tutte le informazioni aggiuntive.
                .getSubject(); // ottengo il subject, che sarebbe l'id dell'utente a cui il token è associato, che è presente nel payload.
    }
}

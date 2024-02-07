package simonelli.fabio.CapstoneProject.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reputation {
    @Id
    @GeneratedValue
    private UUID id;
    private int points;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}

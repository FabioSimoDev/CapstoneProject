package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsersDAO extends JpaRepository<User, UUID> {
    public Optional<User> findByEmailIgnoreCase(String email);

    public Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

//    public User findByUser(User user);
}

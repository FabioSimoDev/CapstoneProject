package simonelli.fabio.CapstoneProject.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simonelli.fabio.CapstoneProject.entities.Folder;
import simonelli.fabio.CapstoneProject.entities.User;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderDAO extends JpaRepository<Folder, UUID> {
    public Page<Folder> findByUser(User user, Pageable pageable);

    public boolean existsByUserIdAndPostsId(UUID userId, UUID postId);

    public List<Folder> findByUserIdAndPostsId(UUID userId, UUID postId);
}

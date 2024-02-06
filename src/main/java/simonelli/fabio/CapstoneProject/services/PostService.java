package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.NewPostDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingPostDTO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.UUID;

@Service
public class PostService {
    @Autowired
    PostsDAO postsDAO;

    @Autowired
    UsersDAO usersDAO;

    public Page<Post> getAllPosts(int page, int size, String orderBy) {
        if (size >= 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return postsDAO.findAll(pageable);
    }

    // in questo caso usare transactional è indifferente, viene gestito da Spring Data. lo tengo per abitudine e chiarezza del codice.
    @Transactional
    public PostResponseDTO createPost(User currentUser, NewPostDTO body) {
        Post newPost = new Post();
        newPost.setContent(body.content());
        newPost.setTitle(body.title());
        newPost.setImageURL(body.imageURL());
        newPost.setUser(currentUser);
        // aggiungi il post alla lista di post dello user
        User user = usersDAO.findById(currentUser.getId()).orElseThrow(() -> new NotFoundException("Utente con ID " + currentUser.getId() + " non trovato. Sembrano esserci problemi con il token"));
        user.addPost(newPost);
        usersDAO.save(user);
        // il Post verrà salvato automaticamente per via del CascadeType.ALL

        return new PostResponseDTO(newPost.getId(), newPost.getTitle(), newPost.getContent(), newPost.getImageURL(), newPost.getPublishDate(), newPost.getUser().getId());
    }

    public PostResponseDTO findById(UUID id) {
        Post found = postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
        return new PostResponseDTO(id, found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), found.getUser().getId());
    }

    public void findByIdAndDelete(UUID id) {
        Post found = postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
        postsDAO.delete(found);
    }

    public PostResponseDTO findByIdAndUpdate(UUID id, UpdateExistingPostDTO body) {
        Post found = postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
        if (body.content() != null && !body.content().isEmpty()) {
            if (body.content().length() > 300)
                throw new BadRequestException("Il contenuto è troppo lungo: max 300 caratteri.");
            found.setContent(body.content());
        }

        if (body.title() != null && !body.title().isEmpty()) {
            if (body.title().length() < 4 || body.title().length() > 40)
                throw new BadRequestException("Il titolo non deve essere inferiore ai 4 caratteri o maggiore di 40.");
            found.setTitle(body.title());
        }

        if (body.image_url() != null && !body.image_url().isEmpty()) {
            found.setImageURL(body.image_url());
        } else if ((body.image_url() == null && body.title() == null && body.content() == null)) {
            throw new BadRequestException("Il payload non può essere vuoto!");
        }

        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), found.getUser().getId());
    }
}

package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Like;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.repositories.LikesDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.UUID;

@Service
public class LikeService {
    @Autowired
    LikesDAO likesDAO;

    @Autowired
    UsersService usersService;

    @Lazy
    @Autowired
    PostService postService;

    @Autowired
    UsersDAO usersDAO;


    public Page<Like> getAllLikes(int page, int size, String orderBy) {
        if (size >= 100) size = 100;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return likesDAO.findAll(pageable);
    }

    public Page<Like> getAllFromUser(UUID userId) {
        //aggiungere parametri della page (page, size, orderBy)
        Pageable pageable = PageRequest.of(0, 10, Sort.by("id"));
        return likesDAO.findAllByUserId(userId, pageable);
    }

    public boolean existsByUserAndPost(UUID userId, UUID postId) {
        return likesDAO.existsByUserIdAndPostId(userId, postId);
    }

    public long getPostLikesCount(UUID postId) {
        return likesDAO.countByPostId(postId);
    }

    public Like findById(UUID id) {
        return likesDAO.findById(id).orElseThrow(() -> new NotFoundException("Like con ID " + id + " non trovato"));
    }

    public void findByIdAndDelete(UUID id) {
        Like found = this.findById(id);
        likesDAO.delete(found);
    }

    @Transactional
    public String addLike(UUID userId, UUID postId) {
        if (existsByUserAndPost(userId, postId)) {
            throw new BadRequestException("L'utente ha già messo mi piace a questo post!");
        }
        Like like = new Like();
        //ottengo il post
        Post post = postService.findPostById(postId);
        like.setPost(post);
        //ottengo l'utente
        User user = usersService.findById(userId);
        user.addLike(like);
        like.setUser(user);
        //salvo lo user, che grazie a CascadeType.ALL salva anche il post e il like.
        usersDAO.save(user);
        return "Mi piace aggiungo con successo";
    }
}

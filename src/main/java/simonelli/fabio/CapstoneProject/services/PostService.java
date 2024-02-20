package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.payloads.NewPostDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingPostDTO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    PostsDAO postsDAO;

    @Autowired
    UsersDAO usersDAO;

    @Autowired
    HashtagService hashtagService;

    @Autowired
    HashtagsDAO hashtagsDAO;

    @Autowired
    LikeService likeService;

    public Page<PostResponseDTO> getAllPosts(int page, int size, String orderBy) {
        if (size >= 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Post> postPage = postsDAO.findAll(pageable);
        Page<PostResponseDTO> responseDTOPage = postPage.map(post -> {
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), post.getUser().getId());
        });
        return responseDTOPage;
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

        return new PostResponseDTO(newPost.getId(), newPost.getTitle(), newPost.getContent(), newPost.getImageURL(), newPost.getPublishDate(), likeService.getPostLikesCount(newPost.getId()), newPost.getUser().getId());
    }

    public PostResponseDTO findById(UUID id) {
        Post found = postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
        return new PostResponseDTO(id, found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), found.getUser().getId());
    }

    public Post findPostById(UUID id) {
        return postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
    }

    public void findByIdAndDelete(UUID id) {
        Post found = this.findPostById(id);
        postsDAO.delete(found);
    }

    public PostResponseDTO findByIdAndUpdate(UUID id, UpdateExistingPostDTO body) {
        Post found = this.findPostById(id);
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

        if (body.imageURL() != null && !body.imageURL().isEmpty()) {
            found.setImageURL(body.imageURL());
        } else if ((body.imageURL() == null && body.title() == null && body.content() == null)) {
            throw new BadRequestException("Il payload non può essere vuoto!");
        }
        postsDAO.save(found);
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), found.getUser().getId());
    }

    public List<PostResponseDTO> findByUser(User user) {
        List<PostResponseDTO> postResponseDTOS = postsDAO.findByUser(user).stream().map(post -> {
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), post.getUser().getId());
        }).toList();

        return postResponseDTOS;
    }

    @Transactional
    public PostResponseDTO addHashtagToPost(UUID postId, String hashtag) {
        Post found = this.findPostById(postId);
        NewHastagDTO newHastagDTO = new NewHastagDTO(hashtag);
        UUID newHashtagId = hashtagService.saveHashtag(newHastagDTO).id();
        Hashtag newHashtag = hashtagsDAO.findById(newHashtagId).get();
        found.addHashtag(newHashtag);
        postsDAO.save(found);
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), found.getUser().getId());
    }

    @Transactional
    public PostResponseDTO removeHashtagFromPost(UUID postId, String hashtag) {
        Post found = this.findPostById(postId);
        NewHastagDTO newHastagDTO = new NewHastagDTO(hashtag);
        UUID newHashtagId = hashtagService.saveHashtag(newHastagDTO).id();
        Hashtag newHashtag = hashtagsDAO.findById(newHashtagId).get();
        found.removeHashtag(newHashtag);
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), found.getUser().getId());
    }
}

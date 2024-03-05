package simonelli.fabio.CapstoneProject.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.*;
import simonelli.fabio.CapstoneProject.repositories.CommentsDAO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.io.IOException;
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

    @Autowired
    CommentsDAO commentsDAO;

    @Autowired
    Cloudinary cloudinaryUploader;

    public Page<PostResponseDTO> getAllPosts(User user, int page, int size, String orderBy) {
        if (size >= 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy).descending());
        Page<Post> postPage = postsDAO.findAll(pageable);
        Page<PostResponseDTO> responseDTOPage = postPage.map(post -> {
            PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(post.getUser().getId(), post.getUser().getUsername(), post.getUser().getAvatarURL());
            boolean isLiked = likeService.existsByUserAndPost(user.getId(), post.getId());
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), isLiked, commentsDAO.countByPostId(post.getId()), postUserDataResponseDTO);
        });
        return responseDTOPage;
    }

    // in questo caso usare transactional è indifferente, viene gestito da Spring Data. lo tengo per abitudine e chiarezza del codice.
    @Transactional
    public PostResponseDTO createPost(MultipartFile file, User currentUser, NewPostDTO body) throws IOException {
        String url = null;
        if (!(file == null)) {
            url = (String) cloudinaryUploader.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap())
                    .get("url");
        }
        Post newPost = new Post();
        newPost.setContent(body.content());
        newPost.setTitle(body.title());
        newPost.setImageURL(url == null ? body.imageURL() : url);
        newPost.setUser(currentUser);
        // aggiungi il post alla lista di post dello user
        User user = usersDAO.findById(currentUser.getId()).orElseThrow(() -> new NotFoundException("Utente con ID " + currentUser.getId() + " non trovato. Sembrano esserci problemi con il token"));
        user.addPost(newPost);
        usersDAO.save(user);
        // il Post verrà salvato automaticamente per via del CascadeType.ALL

        PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(newPost.getUser().getId(), newPost.getUser().getUsername(), newPost.getUser().getAvatarURL());
        boolean isLiked = likeService.existsByUserAndPost(user.getId(), newPost.getId());
        return new PostResponseDTO(newPost.getId(), newPost.getTitle(), newPost.getContent(), newPost.getImageURL(), newPost.getPublishDate(), likeService.getPostLikesCount(newPost.getId()), isLiked, commentsDAO.countByPostId(newPost.getId()), postUserDataResponseDTO);
    }

    public PostResponseDTO findById(User user, UUID id) {
        Post found = postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
        PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(found.getUser().getId(), found.getUser().getUsername(), found.getUser().getAvatarURL());
        boolean isLiked = likeService.existsByUserAndPost(user.getId(), found.getId());
        return new PostResponseDTO(id, found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), isLiked, commentsDAO.countByPostId(found.getId()), postUserDataResponseDTO);
    }

    public Post findPostById(UUID id) {
        return postsDAO.findById(id).orElseThrow(() -> new NotFoundException("Post con ID " + id + " non trovato."));
    }

    public void findByIdAndDelete(UUID id) {
        Post found = this.findPostById(id);
        postsDAO.delete(found);
    }

    public PostResponseDTO findByIdAndUpdate(User user, UUID id, UpdateExistingPostDTO body) {
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
        PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(found.getUser().getId(), found.getUser().getUsername(), found.getUser().getAvatarURL());
        boolean isLiked = likeService.existsByUserAndPost(user.getId(), found.getId());
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), isLiked, commentsDAO.countByPostId(found.getId()), postUserDataResponseDTO);
    }

    public List<PostResponseDTO> findByUserId(UUID userId) {
        User user = usersDAO.findById(userId).orElseThrow(() -> new NotFoundException(userId));
        List<PostResponseDTO> postResponseDTOS = postsDAO.findByUser(user).stream().map(post -> {
            PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(post.getUser().getId(), post.getUser().getUsername(), post.getUser().getAvatarURL());
            boolean isLiked = likeService.existsByUserAndPost(user.getId(), post.getId());
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), isLiked, commentsDAO.countByPostId(post.getId()), postUserDataResponseDTO);
        }).toList();

        return postResponseDTOS;
    }

    public List<PostResponseDTO> findByUser(User user) {
        List<PostResponseDTO> postResponseDTOS = postsDAO.findByUser(user).stream().map(post -> {
            PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(post.getUser().getId(), post.getUser().getUsername(), post.getUser().getAvatarURL());
            boolean isLiked = likeService.existsByUserAndPost(user.getId(), post.getId());
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), isLiked, commentsDAO.countByPostId(post.getId()), postUserDataResponseDTO);
        }).toList();

        return postResponseDTOS;
    }

    @Transactional
    public PostResponseDTO addHashtagToPost(User user, UUID postId, String hashtag) {
        Post found = this.findPostById(postId);
        NewHastagDTO newHastagDTO = new NewHastagDTO(hashtag);
        UUID newHashtagId = hashtagService.saveHashtag(newHastagDTO).id();
        Hashtag newHashtag = hashtagsDAO.findById(newHashtagId).get();
        found.addHashtag(newHashtag);
        postsDAO.save(found);
        PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(found.getUser().getId(), found.getUser().getUsername(), found.getUser().getAvatarURL());
        boolean isLiked = likeService.existsByUserAndPost(user.getId(), found.getId());
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), isLiked, commentsDAO.countByPostId(found.getId()), postUserDataResponseDTO);
    }

    @Transactional
    public PostResponseDTO removeHashtagFromPost(User user, UUID postId, String hashtag) {
        Post found = this.findPostById(postId);
        NewHastagDTO newHastagDTO = new NewHastagDTO(hashtag);
        UUID newHashtagId = hashtagService.saveHashtag(newHastagDTO).id();
        Hashtag newHashtag = hashtagsDAO.findById(newHashtagId).get();
        found.removeHashtag(newHashtag);
        PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(found.getUser().getId(), found.getUser().getUsername(), found.getUser().getAvatarURL());
        boolean isLiked = likeService.existsByUserAndPost(user.getId(), found.getId());
        return new PostResponseDTO(found.getId(), found.getTitle(), found.getContent(), found.getImageURL(), found.getPublishDate(), likeService.getPostLikesCount(found.getId()), isLiked, commentsDAO.countByPostId(found.getId()), postUserDataResponseDTO);
    }
}

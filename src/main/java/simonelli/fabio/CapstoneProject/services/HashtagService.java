package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.payloads.HashtagResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.PostUserDataResponseDTO;
import simonelli.fabio.CapstoneProject.repositories.CommentsDAO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;

import java.util.*;

@Service
public class HashtagService {
    @Autowired
    private HashtagsDAO hashtagsDAO;
    @Autowired
    private PostsDAO postsDAO;
    @Autowired
    LikeService likeService;

    @Autowired
    CommentsDAO commentsDAO;

    public Set<HashtagResponseDTO> findAllHashtags(){
        return new HashSet<>(hashtagsDAO.findAll().stream().map((hashtag)->{
            return new HashtagResponseDTO(hashtag.getId(), hashtag.getHashtagText());
        }).toList());
    }

    public HashtagResponseDTO saveHashtag(NewHastagDTO body){
        Hashtag newHashtag = new Hashtag(body.hashtag());
        Optional<Hashtag> found = hashtagsDAO.findByHashtagText(newHashtag.getHashtagText());
        //se l'hashtag non esiste, lo crea. altrimenti restituisce l'hashtag esistente
        if(found.isEmpty()){
            hashtagsDAO.save(newHashtag);
            return new HashtagResponseDTO(newHashtag.getId(), newHashtag.getHashtagText());
        }
        return new HashtagResponseDTO(found.get().getId(), found.get().getHashtagText());
    }

    public Page<PostResponseDTO> findPostsByHashtag(User user, String hashtag, int page, int size, String orderBy) {
        if(size > 30) size=30;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Post> postsPage = postsDAO.findByHashtags_HashtagText(hashtag, pageable);

        Page<PostResponseDTO> responseDTOPage = postsPage.map(post -> {
            PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(post.getUser().getId(), post.getUser().getUsername(), post.getUser().getAvatarURL());
            boolean isLiked = likeService.existsByUserAndPost(user.getId(), post.getId());
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), isLiked, commentsDAO.countByPostId(post.getId()), postUserDataResponseDTO);
        });
        return responseDTOPage;
    }

    public Page<HashtagResponseDTO> getPostHashtags(UUID postId, int page, int size, String orderBy){
        if(size > 20) size = 20;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Hashtag> hashtagPage = hashtagsDAO.findByPostsId(postId, pageable);

        Page<HashtagResponseDTO> responseDTOPage = hashtagPage.map(hashtag -> {
            return new HashtagResponseDTO(hashtag.getId(), hashtag.getHashtagText());
        });
        return responseDTOPage;
    }

    public Page<HashtagResponseDTO> getHashtagsByText(String query, int page, int size, String orderBy){
        if(size > 10) size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Hashtag> hashtagPage = hashtagsDAO.findByHashtagTextContainingIgnoreCase(query, pageable);

        Page<HashtagResponseDTO> responseDTOPage = hashtagPage.map(hashtag -> {
            return new HashtagResponseDTO(hashtag.getId(), hashtag.getHashtagText());
        });
        return responseDTOPage;
    }
}

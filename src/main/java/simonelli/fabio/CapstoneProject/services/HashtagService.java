package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.payloads.HashtagResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HashtagService {
    @Autowired
    private HashtagsDAO hashtagsDAO;
    @Autowired
    private PostsDAO postsDAO;
    @Autowired
    LikeService likeService;

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

    public Page<PostResponseDTO> findPostsByHashtag(String hashtag, int page, int size, String orderBy) {
        if(size > 30) size=30;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Post> postsPage = postsDAO.findByHashtags_HashtagText(hashtag, pageable);

        Page<PostResponseDTO> responseDTOPage = postsPage.map(post -> {
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), post.getUser().getId());
        });
        return responseDTOPage;
    }
}

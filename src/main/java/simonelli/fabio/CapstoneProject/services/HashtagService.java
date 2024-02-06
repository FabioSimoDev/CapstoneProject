package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.payloads.HashtagResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HashtagService {
    @Autowired
    private HashtagsDAO hashtagsDAO;

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
}

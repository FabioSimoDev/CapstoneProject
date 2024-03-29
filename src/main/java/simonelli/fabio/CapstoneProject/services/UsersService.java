package simonelli.fabio.CapstoneProject.services;

import com.cloudinary.utils.ObjectUtils;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import simonelli.fabio.CapstoneProject.config.CloudinaryConfig;
import simonelli.fabio.CapstoneProject.entities.NoteRequest;
import simonelli.fabio.CapstoneProject.entities.Reputation;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.NewNoteRequestDTO;
import simonelli.fabio.CapstoneProject.payloads.NoteRequestDTO;
import simonelli.fabio.CapstoneProject.payloads.ReputationDTO;
import simonelli.fabio.CapstoneProject.repositories.NoteRequestDAO;
import simonelli.fabio.CapstoneProject.repositories.ReputationDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.io.IOException;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private ReputationDAO reputationDAO;

    @Autowired
    private NoteRequestDAO noteRequestDAO;

    @Autowired
    private Cloudinary cloudinaryUploader;

    public Page<User> getUsers(int page, int size, String orderBy) {
        if(size>=100)size=100;
        Pageable pageable= PageRequest.of(page,size, Sort.by(orderBy));
        return usersDAO.findAll(pageable);
    }

    @Transactional
    public void followUser(User currentUser, UUID followedUserId) {
        User followingUser = findById(currentUser.getId());
        User followedUser = findById(followedUserId);
        followedUser.setFollowersCount(followedUser.getFollowersCount() + 1);
        followingUser.setFollowingCount(followingUser.getFollowingCount() + 1);
        followingUser.follow(followedUser);
        usersDAO.save(followingUser);
    }

    @Transactional
    public void unfollowUser(User currentUser, UUID followedUserId) {
        User followingUser = findById(currentUser.getId());
        User followedUser = findById(followedUserId);
        followedUser.setFollowersCount(followedUser.getFollowersCount() - 1);
        followingUser.setFollowingCount(followingUser.getFollowingCount() - 1);
        followingUser.unfollow(followedUser);
        usersDAO.save(followingUser);
    }


    public boolean isFollowing(User currentUser, UUID followedUserId) {
        User user = findById(currentUser.getId());
        User followedUser = findById(followedUserId);
        return user.getFollowing().contains(followedUser);
    }

    public User findById(UUID id) {
        return usersDAO.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    public Page<User> findUsersByUsernameSample(String username, int page, int size, String orderBy){
        if(size>=100)size=100;
        Pageable pageable= PageRequest.of(page,size, Sort.by(orderBy));
        return usersDAO.findByUsernameContainingIgnoreCase(username, pageable);
    }

    public User findByEmail(String email) {
        return usersDAO.findByEmailIgnoreCase(email).orElseThrow(()->new NotFoundException("Questa mail: " +  email + " non è stata trovata."));
    }

    public void findByIdAndDelete(UUID id) {
        User found=this.findById(id);
        usersDAO.delete(found);
    }

    public void deleteCurrentClient(User user){
        usersDAO.delete(user);
    }

    public User uploadPicture(MultipartFile file, UUID userId) throws IOException
    {

        String url = (String) cloudinaryUploader.uploader()
                .upload(file.getBytes(), ObjectUtils.emptyMap())
                .get("url");
        User found = this.findById(userId);
        found.setAvatarURL(url);
        usersDAO.save(found);
        return found;
    }

    public ReputationDTO getReputationFromUser(UUID userId){
        Reputation found = reputationDAO.findByUserId(userId).orElseThrow(()->new NotFoundException("Problema nell'ottenere la reputazione dell'utente!"));
        return new ReputationDTO(found.getId(), found.getUser().getId(), found.getPoints());
    }

    public ReputationDTO addReputationToUser(User senderUser, UUID targetUser){
        User found = this.findById(targetUser);
        if(senderUser.getId().equals(targetUser)) throw new BadRequestException("Non puoi aggiungere reputazione a te stesso!");
        if(found.getReputation() == null){
            Reputation newReputation = new Reputation();
            newReputation.setUser(found);
            newReputation.setPoints(1);
            found.setReputation(newReputation);
            reputationDAO.save(newReputation);
            return returnReputationDTO(newReputation);
        }else{
            Reputation reputation = found.getReputation();
            reputation.setPoints(reputation.getPoints() + 1);
            reputationDAO.save(reputation);
            return returnReputationDTO(reputation);
        }

    }

    private ReputationDTO returnReputationDTO(Reputation reputation){
        return new ReputationDTO(reputation.getId(), reputation.getUser().getId(), reputation.getPoints());
    }

    public Page<NoteRequestDTO> getAllPersonalNoteRequests(User user, int page, int size, String orderBy){
        if(size > 10) size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<NoteRequest> noteRequestPage = noteRequestDAO.findByUser(user, pageable);

        return noteRequestPage.map(noteRequest -> {
            return new NoteRequestDTO(noteRequest.getId(), noteRequest.getDetails(), noteRequest.getDate(), noteRequest.getUser().getId());
        });
    }

    public NoteRequestDTO createNewNoteRequest(User authenticatedUser, NewNoteRequestDTO body){
        User user = this.findById(authenticatedUser.getId());
        NoteRequest newNoteRequest = new NoteRequest(body.details(), user);
        user.addNoteRequest(newNoteRequest);
        this.save(user);
        return new NoteRequestDTO(newNoteRequest.getId(), newNoteRequest.getDetails(), newNoteRequest.getDate(), newNoteRequest.getUser().getId());
    }

    public NoteRequestDTO findNoteRequestById(UUID id){
        NoteRequest found = noteRequestDAO.findById(id).orElseThrow(()->new NotFoundException("Richiesta con ID " + id + " non trovata."));
        return new NoteRequestDTO(found.getId(), found.getDetails(), found.getDate(), found.getUser().getId());
    }

    public NoteRequestDTO updateNoteRequest(User authenticatedUser, UUID requestId, NewNoteRequestDTO body){
        User user = this.findById(authenticatedUser.getId());
        NoteRequest foundNoteRequest = noteRequestDAO.findById(requestId).orElseThrow(()->new NotFoundException("Richiesta con ID " + requestId + " non trovata."));
        foundNoteRequest.setDetails(body.details());
        this.save(user);
        return new NoteRequestDTO(foundNoteRequest.getId(), foundNoteRequest.getDetails(), foundNoteRequest.getDate(), foundNoteRequest.getUser().getId());
    }

    public void deleteRequest(User authenticatedUser, UUID requestId){
        User user = this.findById(authenticatedUser.getId());
        NoteRequest foundNoteRequest = noteRequestDAO.findById(requestId).orElseThrow(()->new NotFoundException("Richiesta con ID " + requestId + " non trovata."));
        noteRequestDAO.delete(foundNoteRequest);
    }

    public User save(User user){
        return usersDAO.save(user);
    }
}

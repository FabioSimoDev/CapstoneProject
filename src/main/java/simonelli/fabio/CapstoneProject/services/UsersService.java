package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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

import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private ReputationDAO reputationDAO;

    @Autowired
    private NoteRequestDAO noteRequestDAO;

    public Page<User> getUsers(int page, int size, String orderBy) {
        if(size>=100)size=100;
        Pageable pageable= PageRequest.of(page,size, Sort.by(orderBy));
        return usersDAO.findAll(pageable);
    }

    public User findById(UUID id) {
        return usersDAO.findById(id).orElseThrow(()->new NotFoundException(id));
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

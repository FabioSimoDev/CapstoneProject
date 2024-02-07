package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.Reputation;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.ReputationDTO;
import simonelli.fabio.CapstoneProject.repositories.ReputationDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private ReputationDAO reputationDAO;

    public Page<User> getUsers(int page, int size, String orderBy) {
        if(size>=100)size=100;
        Pageable pageable= PageRequest.of(page,size, Sort.by(orderBy));
        return usersDAO.findAll(pageable);
    }

    public User findById(UUID id) {
        return usersDAO.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    public User findByEmail(String email) {
        return usersDAO.findByEmail(email).orElseThrow(()->new NotFoundException("Questa mail: " +  email + "non è stata trovata."));
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

    public User save(User user){
        return usersDAO.save(user);
    }
}

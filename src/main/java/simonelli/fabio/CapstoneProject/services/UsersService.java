package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    UsersDAO usersDAO;

    public Page<User> getUsers(int page, int size, String orderBy)
    {
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
}

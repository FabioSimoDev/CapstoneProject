package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import simonelli.fabio.CapstoneProject.entities.Folder;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.entities.enums.ROLE;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.UnauthorizedException;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingUserDTO;
import simonelli.fabio.CapstoneProject.payloads.UserLoginDTO;
import simonelli.fabio.CapstoneProject.payloads.UserSignInDTO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;
import simonelli.fabio.CapstoneProject.security.JWTTools;

@Service
public class AuthService {
    @Autowired
    private UsersService usersService;

    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private PasswordEncoder bcrypt;

    @Autowired
    private JWTTools jwtTools;

    public User save(UserSignInDTO body) {
        synchronized (this) {
            usersDAO.findByEmailIgnoreCase(body.email()).ifPresent(user -> {
                throw new BadRequestException("l' email " + user.getEmail() + " è già in uso");
            });
            User newUser = new User();
            newUser.setName(body.name());
            newUser.setSurname(body.surname());
            newUser.setUsername(body.username());
            newUser.setRole(ROLE.USER);
            newUser.setEmail(body.email().toLowerCase());
            newUser.setAvatarURL(("https://ui-avatars.com/api/?name=" + body.name() + "+" + body.surname()));
            newUser.setPassword(bcrypt.encode(body.password()));
            Folder newFolder = new Folder("Tutti i post", newUser);
            newUser.addFolder(newFolder);
            return usersDAO.save(newUser);
        }
    }

    public String authenticateUser(UserLoginDTO body) {
        User user = usersService.findByEmail(body.email());

        if (bcrypt.matches(body.password(), user.getPassword())) {
            return jwtTools.createToken(user);
        } else {
            System.out.println(body.password() + " " + bcrypt.encode(body.password()) + " " + user.getPassword());
            throw new UnauthorizedException("Credenziali non valide!");
        }
    }

    public User updateUser(User currentUser, UpdateExistingUserDTO body) {
        User found = usersService.findById(currentUser.getId());
        if (body.name() != null) {
            if (!body.name().isEmpty()) {
                found.setName(body.name());
            }
        }
        if (body.surname() != null) {
            if (!body.surname().isEmpty()) {
                found.setSurname(body.surname());
            }
        }
        if (body.username() != null) {
            if (!body.username().isEmpty()) {
                found.setUsername(body.username());
            }
        }
        if (body.email() != null) {
            if (!body.email().isEmpty()) {
                found.setEmail(body.email());
            }
        }
        if (body.password() != null) {
            if (!body.password().isEmpty()) {
                found.setPassword(bcrypt.encode(body.password()));
            }
        }
        if (body.phoneNumber() != null) {
            if (!body.phoneNumber().isEmpty()) {
                found.setPhoneNumber(body.phoneNumber());
            }
        }
        if (body.biography() != null) {
            if (!body.biography().isEmpty()) {
                found.setBiography(body.biography());
            }
        }
        return usersDAO.save(found);
    }

}

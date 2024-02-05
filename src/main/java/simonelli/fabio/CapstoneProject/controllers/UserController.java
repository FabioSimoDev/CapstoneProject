package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingUserDTO;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.services.AuthService;
import simonelli.fabio.CapstoneProject.services.UsersService;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UsersService usersService;

    @Autowired
    AuthService authService;

    @GetMapping
    public Page<User> getAllUsers(@AuthenticationPrincipal User currentUser,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "id") String orderBy){
        return usersService.getUsers(page, size, orderBy);
    }

    @PutMapping("/me/updateProfile")
    public User updateUser(@AuthenticationPrincipal User currentUser, @RequestBody @Validated UpdateExistingUserDTO body, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new BadRequestException(validation.getAllErrors());
        } else {
            return authService.updateUser(currentUser, body);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void findByIdAndDelete(@PathVariable UUID id) {
        usersService.findByIdAndDelete(id);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCurrentClient(@AuthenticationPrincipal User currentUser){
        usersService.deleteCurrentClient(currentUser);
    }
}

package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.payloads.UserLoginDTO;
import simonelli.fabio.CapstoneProject.payloads.UserLoginResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UserResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UserSignInDTO;
import simonelli.fabio.CapstoneProject.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public UserLoginResponseDTO login(@RequestBody @Validated UserLoginDTO body, BindingResult validation) {
        if(validation.hasErrors()){
            throw new BadRequestException(validation.getAllErrors());
        }else {
            String accessToken = authService.authenticateUser(body);
            return new UserLoginResponseDTO(accessToken);
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDTO createUser(@RequestBody @Validated UserSignInDTO newUserPayload, BindingResult validation) {
        System.out.println(validation);
        if (validation.hasErrors()) {
            throw new BadRequestException(validation.getAllErrors());
        } else {
            User newUser = authService.save(newUserPayload);

            return new UserResponseDTO(newUser.getId());
        }
    }
}

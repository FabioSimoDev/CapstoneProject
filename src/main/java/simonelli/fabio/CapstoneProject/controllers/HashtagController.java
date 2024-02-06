package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.payloads.HashtagResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.services.HashtagService;

import java.util.Set;

@RestController
@RequestMapping("/hashtags")
public class HashtagController {
    @Autowired
    private HashtagService hashtagService;

    @GetMapping
    public Set<HashtagResponseDTO> getAllHashtags() {
        return hashtagService.findAllHashtags();
    }

    @PostMapping
    public HashtagResponseDTO createHashtag(@RequestBody @Validated NewHastagDTO hashtag, BindingResult validation) {
        if(validation.hasErrors()){
            throw new BadRequestException(validation.getAllErrors());
        }
        return hashtagService.saveHashtag(hashtag);
    }
}
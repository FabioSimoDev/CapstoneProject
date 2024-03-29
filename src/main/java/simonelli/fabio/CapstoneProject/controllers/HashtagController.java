package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.Hashtag;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.payloads.HashtagResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.NewHastagDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.repositories.HashtagsDAO;
import simonelli.fabio.CapstoneProject.services.HashtagService;

import java.util.Set;
import java.util.UUID;

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
        if (validation.hasErrors()) {
            throw new BadRequestException(validation.getAllErrors());
        }
        return hashtagService.saveHashtag(hashtag);
    }

    @GetMapping("/posts")
    public Page<PostResponseDTO> getPostsByHashtag(@AuthenticationPrincipal User currentUser,
                                                   @RequestParam String hashtag,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "20") int size,
                                                   @RequestParam(defaultValue = "id") String orderBy) {
        return hashtagService.findPostsByHashtag(currentUser, hashtag, page, size, orderBy);
    }

    @GetMapping("/postHashtag/{postId}")
    public Page<HashtagResponseDTO> getPostHashtags(@PathVariable UUID postId,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "20") int size,
                                                    @RequestParam(defaultValue = "id") String orderBy) {
        return hashtagService.getPostHashtags(postId, page, size, orderBy);
    }

    @GetMapping("/")
    public Page<HashtagResponseDTO> getHashtagByText(@RequestParam String query, @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "20") int size,
                                                     @RequestParam(defaultValue = "id") String orderBy) {
        return hashtagService.getHashtagsByText(query, page, size, orderBy);

    }
}

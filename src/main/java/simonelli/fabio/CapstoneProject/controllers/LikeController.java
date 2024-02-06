package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.Like;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.services.LikeService;
import simonelli.fabio.CapstoneProject.services.PostService;
import simonelli.fabio.CapstoneProject.services.UsersService;

import java.util.UUID;

@RestController
@RequestMapping("likes")
public class LikeController {
    @Autowired
    LikeService likeService;

    @Autowired
    UsersService usersService;

    @Autowired
    PostService postService;

    @GetMapping
    public Page<Like> getAllLikes(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "id") String orderBy){
        return likeService.getAllLikes(page, size, orderBy);
    }

    @GetMapping("/me")
    public Page<Like> getPersonalLikes(@AuthenticationPrincipal User currentUser){
        return likeService.getAllFromUser(currentUser.getId());
    }

    @GetMapping("/exist")
    public boolean checkIfLikeExistsByUserAndPost(@AuthenticationPrincipal User currentUser, @RequestParam UUID postId){
        return likeService.existsByUserAndPost(currentUser.getId(), postId);
    }

    @GetMapping("/count")
    public long countPostLikes(@RequestParam UUID postId){
        return likeService.getPostLikesCount(postId);
    }

    @PostMapping("/add")
    public String addLike(@AuthenticationPrincipal User currentUser, @RequestParam UUID postId) {
        return likeService.addLike(currentUser.getId(), postId);
    }
}

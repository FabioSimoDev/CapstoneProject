package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.payloads.NewPostDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingPostDTO;
import simonelli.fabio.CapstoneProject.services.PostService;

import java.util.UUID;

@RestController
@RequestMapping("posts")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping
    public Page<Post> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String orderBy) {
        return postService.getAllPosts(page, size, orderBy);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDTO savePost(@AuthenticationPrincipal User currentUser, @RequestBody NewPostDTO body){
        return postService.createPost(currentUser, body);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId){
        postService.findByIdAndDelete(postId);
    }

    @GetMapping("/{postId}")
    public PostResponseDTO getPostById(@PathVariable UUID postId){
        return postService.findById(postId);
    }

    @PutMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDTO getPostByIdAndUpdate(@PathVariable UUID postId, @RequestBody UpdateExistingPostDTO body){
        return postService.findByIdAndUpdate(postId, body);
    }

//    @GetMapping("/me/latest")
//    public getLatestPost(@AuthenticationPrincipal User currentUser){
//        postService.findLatestByUser(currentUser.getId());
//    }

}

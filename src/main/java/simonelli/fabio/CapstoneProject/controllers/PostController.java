package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.payloads.NewPostDTO;
import simonelli.fabio.CapstoneProject.payloads.PostResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingPostDTO;
import simonelli.fabio.CapstoneProject.services.PostService;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("posts")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping
    public Page<PostResponseDTO> getAllPosts(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String orderBy) {
        return postService.getAllPosts(currentUser, page, size, orderBy);
    }

    @GetMapping("/getByUser/{userId}")
    public List<PostResponseDTO> getPostsByUser(@PathVariable UUID userId){
        return postService.findByUserId(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDTO savePost(@RequestParam(name = "image", required = false) MultipartFile file, @AuthenticationPrincipal User currentUser, @ModelAttribute NewPostDTO body) throws IOException {
        return postService.createPost(file, currentUser, body);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId){
        postService.findByIdAndDelete(postId);
    }

    @GetMapping("/{postId}")
    public PostResponseDTO getPostById(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId){
        return postService.findById(currentUser, postId);
    }

    @PutMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDTO getPostByIdAndUpdate(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId, @RequestBody UpdateExistingPostDTO body){
        return postService.findByIdAndUpdate(currentUser, postId, body);
    }

    @GetMapping("/me")
    public List<PostResponseDTO> getLoggedUserPosts(@AuthenticationPrincipal User currentUser){
        return postService.findByUser(currentUser);
    }

    @PostMapping("/{postId}/addHashtag/{hashtagText}")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDTO addHashtagToPost(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId, @PathVariable String hashtagText){
        return postService.addHashtagToPost(currentUser, postId, hashtagText);
    }

    @DeleteMapping("/{postId}/removeHashtag/{hashtagText}")
    @ResponseStatus(HttpStatus.OK)
    public PostResponseDTO removeHashtagFromPost(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId, @PathVariable String hashtagText){
        return postService.removeHashtagFromPost(currentUser, postId, hashtagText);
    }


//    @GetMapping("/me/latest")
//    public getLatestPost(@AuthenticationPrincipal User currentUser){
//        postService.findLatestByUser(currentUser.getId());
//    }

}

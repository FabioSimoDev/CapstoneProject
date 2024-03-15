package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.Comment;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.payloads.NewCommentDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingCommentDTO;
import simonelli.fabio.CapstoneProject.services.CommentService;

import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping
    public Page<Comment> getAllComments(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size,
                                        @RequestParam(defaultValue = "id") String orderBy) {
        return commentService.getAllComments(page, size, orderBy);
    }

    @GetMapping("/me")
    public Page<Comment> getAllCommentsByUser(@AuthenticationPrincipal User currentUser, @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size,
                                              @RequestParam(defaultValue = "id") String orderBy) {
        return commentService.getAllCommentsByUser(currentUser, page, size, orderBy);
    }

    @GetMapping("/{postId}")
    public Page<Comment> getAllCommentsOnPost(@PathVariable UUID postId, @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size,
                                              @RequestParam(defaultValue = "id") String orderBy) {
        return commentService.getAllCommentsOnPost(postId, page, size, orderBy);
    }

    @GetMapping("/me/{postId}")
    public Page<Comment> getAllCommentsOnPostByUser(@AuthenticationPrincipal User currentUser, @PathVariable UUID postId, @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size,
                                                    @RequestParam(defaultValue = "id") String orderBy) {
        return commentService.getAllCommentOnPostByUser(currentUser, postId, page, size, orderBy);
    }

    @DeleteMapping("/delete/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@AuthenticationPrincipal User currentUser, @PathVariable UUID commentId){
        commentService.foundByIdAndDelete(currentUser, commentId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createComment(@AuthenticationPrincipal User currentUser, @RequestParam UUID postId, @RequestBody @Validated NewCommentDTO body, BindingResult validation){
        if(validation.hasErrors()){
            throw new BadRequestException(validation.getAllErrors());
        }
        return commentService.createComment(currentUser.getId(), postId, body);
    }

    @PutMapping("/update/{commentId}")
    public Comment updateComment(@AuthenticationPrincipal User currentUser, @PathVariable UUID commentId, @RequestBody UpdateExistingCommentDTO body){
        return commentService.findByIdAndUpdate(currentUser, commentId, body);
    }
}

package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Comment;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.payloads.NewCommentDTO;
import simonelli.fabio.CapstoneProject.payloads.UpdateExistingCommentDTO;
import simonelli.fabio.CapstoneProject.repositories.CommentsDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;

import java.util.UUID;

@Service
public class CommentService {
    @Autowired
    CommentsDAO commentsDAO;

    @Autowired
    PostService postService;

    @Autowired
    UsersService usersService;

    @Autowired
    UsersDAO usersDAO;

    public Page<Comment> getAllComments(int page, int size, String orderBy) {
        if (size >= 150) size = 150;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return commentsDAO.findAll(pageable);
    }

    public Page<Comment> getAllCommentsByUser(User user, int page, int size, String orderBy){
        if (size >= 150) size = 150;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return commentsDAO.findByUser(user, pageable);
    }

    public Page<Comment> getAllCommentsOnPost(UUID postId, int page, int size, String orderBy){
        if (size >= 20) size = 20;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return commentsDAO.findByPostId(postId, pageable);
    }

    public Page<Comment> getAllCommentOnPostByUser(User user, UUID postId, int page, int size, String orderBy){
        if (size >= 20) size = 20;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        return commentsDAO.findByUserAndPostId(user, postId, pageable);
    }

    @Transactional
    public Comment createComment(UUID userId, UUID postId, NewCommentDTO body){
        Post post = postService.findPostById(postId);
        User user = usersService.findById(userId);
        Comment newComment = new Comment();
        newComment.setContent(body.content());
        newComment.setPost(post);
        newComment.setUser(user);

        user.addComment(newComment);
        usersDAO.save(user);
        return newComment;
    }

    public Comment findById(UUID id) {
        return commentsDAO.findById(id).orElseThrow(() -> new NotFoundException("Commento con ID " + id + " non trovato"));
    }

    public Comment findByIdAndUpdate(User user, UUID commentId, UpdateExistingCommentDTO body) {
        Comment found = this.findById(commentId);
        if(!(found.getUser().getId().equals(user.getId()))) throw new BadRequestException("Non puoi modificare commenti di altri utenti");
        if (body.content() != null && !body.content().isEmpty()) {
            if (body.content().length() > 300)
                throw new BadRequestException("Il contenuto è troppo lungo: max 300 caratteri.");
            found.setContent(body.content());
        } else {
            throw new BadRequestException("Il payload non può essere vuoto!");
        }
        return found;
    }

    public void foundByIdAndDelete(User user, UUID commentId){
        Comment found = this.findById(commentId);
        if(!(found.getUser().getId().equals(user.getId()))) throw new BadRequestException("Non puoi eliminare il commento di un altro utente");
        commentsDAO.delete(found);
    }

}

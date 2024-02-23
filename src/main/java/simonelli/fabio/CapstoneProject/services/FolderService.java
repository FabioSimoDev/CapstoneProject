package simonelli.fabio.CapstoneProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Folder;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.NotFoundException;
import simonelli.fabio.CapstoneProject.exceptions.UnauthorizedException;
import simonelli.fabio.CapstoneProject.payloads.*;
import simonelli.fabio.CapstoneProject.repositories.CommentsDAO;
import simonelli.fabio.CapstoneProject.repositories.FolderDAO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FolderService {
    @Autowired
    FolderDAO folderDAO;
    @Autowired
    UsersService usersService;
    @Autowired
    PostService postService;
    @Autowired
    PostsDAO postsDAO;

    @Autowired
    LikeService likeService;

    @Autowired
    CommentsDAO commentsDAO;

    public Page<FolderDTO> getAllFolders(int page, int size, String orderBy) {
        if (size >= 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Folder> foldersPage = folderDAO.findAll(pageable);

        Page<FolderDTO> responseDTOPage = foldersPage.map(folder -> {
            return returnFolderDTO(folder);
        });
        return responseDTOPage;
    }

    public Page<FolderDTO> getAllFoldersFromUser(User authenticatedUser, int page, int size, String orderBy) {
        if (size > 20) size = 20;
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Folder> folderPage = folderDAO.findByUser(authenticatedUser, pageable);

        Page<FolderDTO> responseDTOPage = folderPage.map(this::returnFolderDTO);
        return responseDTOPage;
    }

    public Page<Post> getPostsInFolder(UUID folderId, Pageable pageable){
        return postsDAO.findByFoldersId(folderId, pageable);
    }

    @Transactional
    public FolderWithPostsDTO createFolder(User authenticatedUser, NewFolderDTO body) {
        User currentUser = usersService.findById(authenticatedUser.getId());
        Folder newFolder = new Folder();
        newFolder.setUser(currentUser);
        newFolder.setName(body.name());
        currentUser.addFolder(newFolder);
        usersService.save(currentUser);
        return new FolderWithPostsDTO(newFolder.getId(), currentUser.getId(), newFolder.getName(), newFolder.getDate(), Page.empty(Pageable.unpaged()));
    }

    @Transactional
    public FolderWithPostsDTO addPostToFolder(User authenticatedUser, UUID folderId, UUID postId, int page, int size) {
        Folder folderFound = this.findFolderById(folderId);
        if (!(folderFound.getUser().getId().equals(authenticatedUser.getId())))
            throw new UnauthorizedException("Non puoi modificare cartelle di altri utenti");
        Post postFound = postService.findPostById(postId);
        folderFound.addPost(postFound);
        postFound.addFolder(folderFound);
        folderDAO.save(folderFound);
        return this.findById(authenticatedUser, folderFound.getId(), page, size);
    }

    public FolderWithPostsDTO findById(User user, UUID id, int page, int size) {
        Folder found = folderDAO.findById(id).orElseThrow(() -> new NotFoundException("Cartella con id " + id + " non trovata"));
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> postPage = this.getPostsInFolder(found.getId(), pageable);
        Page<PostResponseDTO> postResponseDTOSPage = postPage.map(post -> {
            PostUserDataResponseDTO postUserDataResponseDTO = new PostUserDataResponseDTO(post.getUser().getId(), post.getUser().getUsername(), post.getUser().getAvatarURL());
            boolean isLiked = likeService.existsByUserAndPost(user.getId(), post.getId());
            return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getImageURL(), post.getPublishDate(), likeService.getPostLikesCount(post.getId()), isLiked, commentsDAO.countByPostId(post.getId()), postUserDataResponseDTO);
        });
        return returnFolderWithPostsDTO(found, postResponseDTOSPage);
    }

    public void deleteFolder(User authenticatedUser, UUID folderId){
        Folder found = this.findFolderById(folderId);
        if(!(found.getUser().getId().equals(authenticatedUser.getId()))) throw new UnauthorizedException("Non puoi modificare le cartelle di un altro utente");
        folderDAO.delete(found);
    }

    public Folder findFolderById(UUID id) {
        return folderDAO.findById(id).orElseThrow(() -> new NotFoundException("Cartella con id " + id + " non trovata"));
    }

    private FolderWithPostsDTO returnFolderWithPostsDTO(Folder folder, Page<PostResponseDTO> posts) {
        return new FolderWithPostsDTO(folder.getId(), folder.getUser().getId(), folder.getName(), folder.getDate(), posts);
    }

    private FolderDTO returnFolderDTO(Folder folder){
        return new FolderDTO(folder.getId(), folder.getUser().getId(), folder.getName(), folder.getDate());
    }
}

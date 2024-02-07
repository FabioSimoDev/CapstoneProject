package simonelli.fabio.CapstoneProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.exceptions.BadRequestException;
import simonelli.fabio.CapstoneProject.payloads.FolderDTO;
import simonelli.fabio.CapstoneProject.payloads.FolderWithPostsDTO;
import simonelli.fabio.CapstoneProject.payloads.NewFolderDTO;
import simonelli.fabio.CapstoneProject.services.FolderService;

import java.util.UUID;

@RestController
@RequestMapping("/folders")
public class FolderController {
    @Autowired
    private FolderService folderService;

    @GetMapping
    public Page<FolderDTO> getAllFolders(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size,
                                         @RequestParam(defaultValue = "id") String orderBy) {
        return folderService.getAllFolders(page, size, orderBy);
    }

    @GetMapping("/me")
    public Page<FolderDTO> getAllFoldersFromUser(@AuthenticationPrincipal User currentUser, @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "20") int size,
                                                 @RequestParam(defaultValue = "id") String orderBy) {
        return folderService.getAllFoldersFromUser(currentUser, page, size, orderBy);
    }

    @GetMapping("/{folderId}")
    public FolderWithPostsDTO getFolderById(@PathVariable UUID folderId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return folderService.findById(folderId, page, size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FolderWithPostsDTO createFolder(@AuthenticationPrincipal User currentUser, @RequestBody @Validated NewFolderDTO body, BindingResult validation) {
        if (validation.hasErrors()) throw new BadRequestException(validation.getAllErrors());
        return folderService.createFolder(currentUser, body);
    }

    @PostMapping("/{folderId}/addPost/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public FolderWithPostsDTO addPostToFolder(@AuthenticationPrincipal User currentUser, @PathVariable UUID folderId, @PathVariable UUID postId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        return folderService.addPostToFolder(currentUser, folderId, postId, page, size);
    }

    @DeleteMapping("/{folderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFolder(@AuthenticationPrincipal User currentUser, @PathVariable UUID folderId){
        folderService.deleteFolder(currentUser, folderId);
    }
}

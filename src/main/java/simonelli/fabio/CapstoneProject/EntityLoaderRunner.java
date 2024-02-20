package simonelli.fabio.CapstoneProject;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import simonelli.fabio.CapstoneProject.entities.Like;
import simonelli.fabio.CapstoneProject.entities.Post;
import simonelli.fabio.CapstoneProject.entities.User;
import simonelli.fabio.CapstoneProject.entities.enums.ROLE;
import simonelli.fabio.CapstoneProject.payloads.NewPostDTO;
import simonelli.fabio.CapstoneProject.repositories.PostsDAO;
import simonelli.fabio.CapstoneProject.repositories.UsersDAO;
import simonelli.fabio.CapstoneProject.services.LikeService;
import simonelli.fabio.CapstoneProject.services.PostService;
import simonelli.fabio.CapstoneProject.services.UsersService;

import java.util.Locale;
import java.util.Scanner;

@Component
public class EntityLoaderRunner implements CommandLineRunner {

    @Autowired
    private UsersService usersService;

    @Autowired
    private PostService postService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private PasswordEncoder bcrypt;

    @Value("${auto_load_entities}")
    private String choice;

    @Override
    public void run(String... args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        boolean validOption = false;

        do {
            System.out.println("Vuoi Caricare Utenti, Post e Like? (y/n)");
            System.out.println(choice);
            switch (choice) {
                case "y":
                    load();
                    validOption = true;
                    break;
                case "n":
                    validOption = true;
                    break;
                default:
                    System.out.println("Input non valido. Riprova.");
                    break;
            }
        } while (!validOption);


        scanner.close();
    }

    @Transactional
    void load(){
        Faker faker = new Faker(new Locale("it"));
        System.out.println("Creo utenti...");
        for(int i = 0; i < 10; i++){
            User newUser = new User();
            newUser.setEmail(faker.internet().emailAddress());
            newUser.setName(faker.name().name());
            newUser.setSurname(faker.name().lastName());
            newUser.setUsername(faker.name().username());
            newUser.setAvatarURL("https://ui-avatars.com/api/?name=" + newUser.getName() + "+" + newUser.getUsername());
            newUser.setPassword(bcrypt.encode("1234"));
            newUser.setPhoneNumber(faker.phoneNumber().phoneNumber());
            newUser.setRole(ROLE.USER);

            Post newPost = new Post();
            newPost.setTitle(faker.book().title());
            newPost.setContent("descrizione post " + i);
            newPost.setImageURL(faker.internet().url());
            newPost.setUser(newUser);
            NewPostDTO newPostDTO = new NewPostDTO(newPost.getTitle(), newPost.getContent(), newPost.getImageURL());
//            postService.createPost(newUser, newPostDTO);
            newUser.addPost(newPost);
            usersDAO.save(newUser);

            Like newLike = new Like();
            newLike.setUser(newUser);
            newLike.setPost(newPost);

            likeService.addLike(newUser.getId(), newPost.getId());
        }
    }
}

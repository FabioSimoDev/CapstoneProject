package simonelli.fabio.CapstoneProject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import simonelli.fabio.CapstoneProject.payloads.UserLoginDTO;
import simonelli.fabio.CapstoneProject.payloads.UserLoginResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UserResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UserSignInDTO;

//@ExtendWith(SpringExtension.class)
//@WebMvcTest(AuthController.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private static Faker faker = new Faker();
    private static String authToken;
    private static String email;
    private static String password = "cvoYs99iS.N987@";

    @LocalServerPort
    private int port;

    @BeforeAll
    public static void setUp() {
        email = faker.name().username() + "@" + faker.internet().domainName();
    }

    @Test
    @Order(1)
    void registerSuccess() throws JsonProcessingException {
        UserSignInDTO userRegisterDTO = generateUserRegisterDTO();
        ResponseEntity<UserResponseDTO> response = restTemplate.postForEntity("/auth/register", userRegisterDTO, UserResponseDTO.class);
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    @Order(2)
    void registerFailure() throws JsonProcessingException{
        UserSignInDTO userRegisterDTO = generateUserRegisterDTO();
        ResponseEntity<UserResponseDTO> response = restTemplate.postForEntity("/auth/register", userRegisterDTO, UserResponseDTO.class);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    @Order(3)
    void login() throws JsonProcessingException{
        UserLoginDTO userLoginDTO = new UserLoginDTO(email, password);
        ResponseEntity<UserLoginResponseDTO> response = restTemplate.postForEntity("/auth/login", userLoginDTO, UserLoginResponseDTO.class);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        authToken = response.getBody().token();
    }

    @Test
    @Order(4)
    void token(){
        Assertions.assertNotNull(authToken);
    }

    private UserSignInDTO generateUserRegisterDTO() {
        return new UserSignInDTO(
                faker.name().firstName(),
                faker.name().lastName(),
                faker.name().username(),
                email,
                password
        );
    }
}

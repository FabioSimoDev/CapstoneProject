package simonelli.fabio.CapstoneProject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import simonelli.fabio.CapstoneProject.controllers.AuthController;
import simonelli.fabio.CapstoneProject.controllers.PostController;
import simonelli.fabio.CapstoneProject.payloads.UserResponseDTO;
import simonelli.fabio.CapstoneProject.payloads.UserSignInDTO;
import simonelli.fabio.CapstoneProject.security.JWTTools;
import simonelli.fabio.CapstoneProject.services.PostService;
import simonelli.fabio.CapstoneProject.services.UsersService;

//@ExtendWith(SpringExtension.class)
//@WebMvcTest(AuthController.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostControllerTest {

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

    private UserSignInDTO generateUserRegisterDTO() {
        return new UserSignInDTO(
                faker.name().firstName(),
                faker.name().lastName(),
                faker.name().username(),
                email,
                password
        );
    }

//    @Test
//    @WithMockUser
//    public void TestGetALlPostEndpoint() throws Exception{
//        mockMvc.perform(get("/posts")).andExpect(status().isOk()).andExpect(jsonPath("$.content", hasSize(10)));
//    }
}

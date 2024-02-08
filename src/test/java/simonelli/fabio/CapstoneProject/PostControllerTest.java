package simonelli.fabio.CapstoneProject;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
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
import simonelli.fabio.CapstoneProject.security.JWTTools;
import simonelli.fabio.CapstoneProject.services.PostService;
import simonelli.fabio.CapstoneProject.services.UsersService;

//@ExtendWith(SpringExtension.class)
//@WebMvcTest(AuthController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testRegister() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Fabio\", \"surname\": \"Simonelli\", \"username\": \"FabioSimoDev\", \"email\": \"fabio@gmail.com\", \"password\": \"1234\"}"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void TestGetALlPostEndpoint() throws Exception{
        mockMvc.perform(get("/posts")).andExpect(status().isOk()).andExpect(jsonPath("$.content", hasSize(10)));
    }
}

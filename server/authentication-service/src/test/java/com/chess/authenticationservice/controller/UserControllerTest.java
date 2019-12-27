package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @Autowired
    ObjectMapper objectMapper;

    private User mockUser;
    private final Long USER_ID = 1L;
    private final String USER_LOGIN = "testLogin";
    private final String USER_PASSWORD = "userPassword";


    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(USER_ID);
        mockUser.setLogin(USER_LOGIN);
        mockUser.setPassword(USER_PASSWORD);
    }

    @Test
    void registration() throws Exception {
        var json = objectMapper.writeValueAsString(mockUser);

        Mockito.when(userService.save(ArgumentMatchers.any(User.class))).thenReturn(mockUser);

        var result = mockMvc.perform(post("/authentication/register")
                .characterEncoding("utf-8")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        var userCreated = new ObjectMapper().readValue(jsonResponse, User.class);

        assertNotNull(userCreated);
        assertEquals(userCreated.getLogin(), mockUser.getLogin());
    }

    @Test
    void login() throws Exception {

        Mockito.when(userService.findByLogin(ArgumentMatchers.any(String.class))).thenReturn(mockUser);

        var json = objectMapper.writeValueAsString(mockUser);

        mockMvc.perform(post("/authentication/login")
                .characterEncoding("utf-8")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void authorize() throws Exception {

    }
}
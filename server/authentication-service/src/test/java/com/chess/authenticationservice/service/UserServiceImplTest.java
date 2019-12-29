package com.chess.authenticationservice.service;

import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.repository.UserRepository;
import com.chess.authenticationservice.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private UserServiceImpl userService;

    private final Long USER_ID = 1L;
    private final String USER_LOGIN = "testLogin";
    private final String USER_PASSWORD = "userPassword";
    private final String USER_EMAIL= "userEmail";

    private User mockUser;
    private User savedUser;


    @BeforeEach
    void setUp() {
        savedUser= new User();
        savedUser.setLogin(USER_LOGIN);
        savedUser.setPassword(USER_PASSWORD);
        savedUser.setEmail(USER_EMAIL);

        mockUser = new User();
        mockUser.setId(USER_ID);
        mockUser.setLogin(USER_LOGIN);
        mockUser.setEmail(USER_EMAIL);
        mockUser.setPassword(USER_PASSWORD);
    }

    @Test
    void save() {
        when(userRepository.save(any())).thenReturn(mockUser);

        var user = userService.save(savedUser);

        assertNotNull(user);
        assertEquals(mockUser.getLogin(),user.getLogin());
    }

    @Test
    void login() {
        when(userRepository.findByLogin(anyString())).thenReturn(mockUser);
        when(passwordEncoder.matches(anyString(),anyString())).thenReturn(true);
        when(jwtTokenProvider.createToken(anyString())).thenReturn("token");

        var foundUser = userService.login(savedUser);

        assertNotNull(foundUser);
        verify(userRepository).findByLogin(savedUser.getLogin());
    }

    @Test
    void loginUserNotFound(){
        when(userRepository.findByLogin(anyString())).thenReturn(null);

        CustomException exception =  assertThrows(CustomException.class, () -> {
            userService.login(savedUser);
        });

        assertEquals(HttpStatus.NOT_FOUND,exception.getHttpStatus());
    }

    @Test
    void loginIncorrectCredentials(){

    }
}
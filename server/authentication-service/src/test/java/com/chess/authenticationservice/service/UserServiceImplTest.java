package com.chess.authenticationservice.service;

import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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

    @InjectMocks
    private UserServiceImpl userService;

    private final Long USER_ID = 1L;
    private final String USER_LOGIN = "testLogin";
    private final String USER_PASSWORD = "userPassword";

    private User mockUser;


    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(USER_ID);
        mockUser.setLogin(USER_LOGIN);
        mockUser.setPassword(USER_PASSWORD);
    }

    @Test
    void save() {
        when(userRepository.save(any())).thenReturn(mockUser);

        var savedUser = userService.save(mockUser);

        assertNotNull(savedUser);
        assertEquals(mockUser,savedUser);
    }

    @Test
    void findByLogin() {
        when(userRepository.findByLogin(anyString())).thenReturn(mockUser);

        var foundUser = userService.findByLogin(mockUser.getLogin());

        assertNotNull(foundUser);
        verify(userRepository).findByLogin(mockUser.getLogin());
    }

    @Test
    void findByLoginNotFound(){
        when(userRepository.findByLogin(anyString())).thenReturn(null);

        var foundUser = userService.findByLogin(mockUser.getLogin());

        assertNull(foundUser);
        verify(userRepository).findByLogin(mockUser.getLogin());
    }
}
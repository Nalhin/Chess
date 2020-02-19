package com.chess.authenticationservice.service;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.repositories.UserRepository;
import com.chess.authenticationservice.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserDto save(User user) throws CustomException {
        if (user.getPassword() == null || user.getEmail() == null || user.getLogin() == null) {
            throw CustomException.builder().message("Empty field provided.").httpStatus(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        if (userRepository.existsByEmail(user.getEmail()) || userRepository.existsByLogin(user.getLogin())) {
            throw CustomException.builder().message("Login or email already taken.").httpStatus(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getLogin());
        return UserDto.builder().email(savedUser.getEmail()).login(savedUser.getLogin()).token(token).build();
    }

    @Override
    public UserDto login(User user) throws CustomException {
        try {
            if (user.getPassword() == null || user.getLogin() == null) {
                throw CustomException.builder().message("Empty field provided.").httpStatus(HttpStatus.UNPROCESSABLE_ENTITY).build();
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getPassword()));
            User foundUser = userRepository.findByLogin(user.getLogin());
            String token = jwtTokenProvider.createToken(foundUser.getLogin());
            return UserDto.builder().email(foundUser.getEmail()).login(foundUser.getLogin()).token(token).build();
        } catch (AuthenticationException e) {
            throw CustomException.builder().message("Incorrect credentials.").httpStatus(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public UserDto authorize(String login) throws CustomException {
        String token = jwtTokenProvider.createToken(login);
        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw CustomException.builder().message("Incorrect credentials.").httpStatus(HttpStatus.NOT_FOUND).build();
        }
        return UserDto.builder().email(user.getEmail()).login(user.getLogin()).token(token).build();
    }

}

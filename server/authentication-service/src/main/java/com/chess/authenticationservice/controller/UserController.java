package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserService;
import com.chess.authenticationservice.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Controller
public class UserController {

    private final UserService userService;

    private final UserValidator userValidator;

    public UserController(UserService userService, UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @PostMapping(value = "/authentication/register", consumes = "application/json", produces = "application/json")
    public User registration(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping(value = "/authentication/login", consumes = "application/json", produces = "application/json")
    public User login(@RequestBody User user) {
        var savedUser = userService.findByLogin(user.getLogin());

        if (!userValidator.isPasswordEqual(user.getPassword(), savedUser.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Incorrect credentials."
            );
        }
        return savedUser;
    }

}

package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/authentication/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> register(@RequestBody User user) {
        var savedUser = userService.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @PostMapping(value = "/authentication/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> login(@RequestBody User user) {
        var savedUser = userService.findByLogin(user.getLogin());
        return ResponseEntity.ok().body(savedUser);
    }
}

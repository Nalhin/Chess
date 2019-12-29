package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

@RestController
@RequestMapping("/authentication")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> register(@RequestBody User user) {
        var savedUser = userService.save(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> login(@RequestBody User user) {
        var savedUser = userService.login(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @GetMapping(value = "/authorize",produces = "application/json")
    public ResponseEntity<UserDto>authorize(HttpServletRequest req) {
        var user = userService.authorize(req);
        return ResponseEntity.ok().body(user);
    }


}

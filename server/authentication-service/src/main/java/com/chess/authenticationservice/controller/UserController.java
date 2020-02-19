package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/authentication/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> register(@RequestBody User user) throws CustomException {
        UserDto savedUser = userService.save(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @PostMapping(value = "/authentication/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> login(@RequestBody User user) throws CustomException {
        UserDto savedUser = userService.login(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @GetMapping(value = "/authentication/authorize", produces = "application/json")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> authorize(HttpServletRequest req) throws CustomException {
        UserDto user = userService.authorize(req.getRemoteUser());
        return ResponseEntity.ok().body(user);
    }

}

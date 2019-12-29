package com.chess.authenticationservice.service;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.model.User;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    UserDto save(User user);

    UserDto login(User user);

    UserDto authorize(HttpServletRequest req);
}

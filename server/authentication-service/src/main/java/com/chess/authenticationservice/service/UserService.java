package com.chess.authenticationservice.service;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;

public interface UserService {
    UserDto save(User user) throws CustomException;

    UserDto login(User user) throws CustomException;

    UserDto authorize(String login) throws CustomException;
}

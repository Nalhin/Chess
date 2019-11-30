package com.chess.authenticationservice.service;

import com.chess.authenticationservice.model.User;

public interface UserService {
    User save(User user);

    User findByLogin(String login);
}

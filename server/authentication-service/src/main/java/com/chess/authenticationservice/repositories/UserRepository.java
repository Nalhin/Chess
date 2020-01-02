package com.chess.authenticationservice.repositories;

import com.chess.authenticationservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsByLogin(String login);

    boolean existsByEmail(String email);

    User findByLogin(String login);
}

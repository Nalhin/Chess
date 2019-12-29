package com.chess.authenticationservice.security;

import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetails implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetails(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        final User user = userRepository.findByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException("User '" + login + "' not found");
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(login)
                .authorities("USER")
                .password(user.getPassword())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}

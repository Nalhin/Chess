package com.chess.authenticationservice.utils;


import com.chess.authenticationservice.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
@AllArgsConstructor
public class UserValidator implements Validator {

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);

    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "login", "login.empty");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password.empty");

        User user = (User) o;
    }
}

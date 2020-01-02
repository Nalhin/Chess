package com.chess.authenticationservice.service;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface UserService {
    UserDto save(User user) throws CustomException;

    UserDto login(User user) throws CustomException;

    UserDto authorize(HttpServletRequest req) throws CustomException;

    void saveImage(HttpServletRequest req,MultipartFile imageFile) throws CustomException, IOException;
}

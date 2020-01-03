package com.chess.authenticationservice.service;

import com.chess.authenticationservice.exception.CustomException;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface ImageService {
    public void saveImage(HttpServletRequest req, MultipartFile imageFile) throws CustomException, IOException;
}

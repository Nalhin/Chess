package com.chess.authenticationservice.service;

import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void saveImage(HttpServletRequest req, MultipartFile imageFile) throws CustomException, IOException {
        String token = jwtTokenProvider.resolveToken(req);
        String login=jwtTokenProvider.getLogin(token);
        BufferedImage originalImage = ImageIO.read(imageFile.getInputStream());

        Thumbnails.of(originalImage)
                .size(60, 60)
                .outputFormat("jpg")
                .toFile("/images/" + login + "_thumbnail");

        Thumbnails.of(originalImage)
                .size(250, 250)
                .outputFormat("jpg")
                .toFile("/images/" + login);

    }
}

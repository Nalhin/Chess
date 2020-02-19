package com.chess.authenticationservice.service;

import com.chess.authenticationservice.exception.CustomException;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
public class ImageService {

    @Value("${image-path}")
    private String imagePath;


    public void saveImage(String login, MultipartFile imageFile) throws CustomException, IOException {
        BufferedImage originalImage = ImageIO.read(imageFile.getInputStream());

        String path = imagePath != null && imagePath.length()>0 ? imagePath + "/" : "";

        Thumbnails.of(originalImage)
                .size(60, 60)
                .outputFormat("jpg")
                .toFile(path + login + "_thumbnail");

        Thumbnails.of(originalImage)
                .size(250, 250)
                .outputFormat("jpg")
                .toFile(path + login);

    }
}

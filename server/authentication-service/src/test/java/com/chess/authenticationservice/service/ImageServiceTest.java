package com.chess.authenticationservice.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Profile;
import org.springframework.mock.web.MockMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
@Profile("test")
class ImageServiceTest {


    @InjectMocks
    private ImageService imageService;

    @Test
    void saveImage() throws IOException {

        String login = "login";
        String expectedFileName = login + ".jpg";
        String fileName = "test.jpg";
        File file = new File(expectedFileName);
        if (file.exists()) {
            file.delete();
        }

        BufferedImage image = new BufferedImage(20, 20, BufferedImage.TYPE_BYTE_GRAY);
        image.setRGB(15, 15, 123123123);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", outputStream);
        outputStream.flush();
        byte[] imageInByte = outputStream.toByteArray();

        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", fileName,
                "image/jpeg", imageInByte);

        imageService.saveImage(login, mockMultipartFile);

        assertTrue(file.exists());
        file.delete();
        file = new File(login + "_thumbnail.jpg");
        file.delete();
    }
}
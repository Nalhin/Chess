package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.service.ImageService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping(value ="/authentication/save-image")
    public ResponseEntity<String> saveImage(HttpServletRequest req, @RequestParam("image") MultipartFile imageFile) throws Exception {
        imageService.saveImage(req,imageFile);

        return  ResponseEntity.ok().build();
    }
}

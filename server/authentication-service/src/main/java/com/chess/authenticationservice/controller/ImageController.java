package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping(value ="/authentication/save-image")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> saveImage(HttpServletRequest req, @RequestParam("image") MultipartFile imageFile) throws Exception {
        imageService.saveImage(req.getRemoteUser(),imageFile);

        return  ResponseEntity.ok().build();
    }
}

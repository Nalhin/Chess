package com.chess.authenticationservice.controller;

import com.chess.authenticationservice.dto.UserDto;
import com.chess.authenticationservice.exception.CustomException;
import com.chess.authenticationservice.model.User;
import com.chess.authenticationservice.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/authentication")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final ServletContext servletContext;

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> register(@RequestBody User user) throws CustomException {
        var savedUser = userService.save(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> login(@RequestBody User user) throws CustomException {
        var savedUser = userService.login(user);
        return ResponseEntity.ok().body(savedUser);
    }

    @GetMapping(value = "/authorize",produces = "application/json")
    public ResponseEntity<UserDto>authorize(HttpServletRequest req) throws CustomException {
        var user = userService.authorize(req);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping(value ="/save-image")
    public ResponseEntity saveImage(HttpServletRequest req,@RequestParam("image") MultipartFile imageFile) throws Exception {

        userService.saveImage(req,imageFile);

        return  ResponseEntity.ok().build();
    }

    @GetMapping("/avatar/{image}")
    public ResponseEntity<byte[]> getAvatar(@PathVariable ("image") String image) throws IOException {
        InputStream in = servletContext.getResourceAsStream("/images/"+image);

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
    }
}

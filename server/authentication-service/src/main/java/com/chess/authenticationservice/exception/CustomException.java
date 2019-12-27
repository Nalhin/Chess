package com.chess.authenticationservice.exception;

import lombok.*;
import org.springframework.http.HttpStatus;


@Getter
@Setter
@Builder
public class CustomException extends RuntimeException {
    private  String message;
    private  HttpStatus httpStatus;
}

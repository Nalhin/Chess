package com.chess.gameservice.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GameException extends Exception{
    private String message;
}

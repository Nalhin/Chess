package com.chess.gameservice.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameError {
    private String error;

    public GameError(String error) {
        this.error = error;
    }
}

package com.chess.gameservice.moves;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AvailableMovesError {
    private String error;

    public AvailableMovesError(String error) {
        this.error = error;
    }
}

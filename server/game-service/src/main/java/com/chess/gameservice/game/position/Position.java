package com.chess.gameservice.game.position;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class Position {
    private int x;
    private int y;

    public Position() {
    }

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @JsonIgnore
    public boolean isWithinBounds() {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

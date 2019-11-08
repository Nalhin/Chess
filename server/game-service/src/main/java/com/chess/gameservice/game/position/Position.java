package com.chess.gameservice.game.position;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class Position {
    private int x;
    private int y;

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public boolean isWithinBounds() {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

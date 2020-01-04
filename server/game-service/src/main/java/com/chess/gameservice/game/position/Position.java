package com.chess.gameservice.game.position;

import com.chess.gameservice.game.board.Board;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Position {
    private int x;
    private int y;

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @JsonIgnore
    public boolean isWithinBounds() {
        return x >= 0 && x <= Board.BOARD_SIZE && y >= 0 && y <= Board.BOARD_SIZE;
    }

    @JsonIgnore
    public boolean isBottomRow(){
        return x==Board.BOTTOM_ROW;
    }

    @JsonIgnore
    public boolean isTopRow(){
        return x==Board.BOARD_SIZE;
    }


}

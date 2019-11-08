package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.position.Position;

import java.util.List;

public class Bishop extends Piece {

    @Override
    public List<Position> getAvailableMoves() {
        return null;
    }

    @Override
    public boolean isMoveLegal(Position movePosition) {
        return false;
    }
}

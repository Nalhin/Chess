package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class King extends Piece {

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();


        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position movePosition) {
        return false;
    }
}

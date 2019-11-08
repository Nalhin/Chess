package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class Bishop extends Piece {

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        return null;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position movePosition, Board board) {
        return false;
    }
}

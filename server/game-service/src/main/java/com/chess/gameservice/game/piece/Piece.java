package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public abstract class Piece {

    private PlayerColor playerColor;

    public abstract ArrayList<Position> getAvailableMoves(Board board, Position initialPosition);

    public abstract boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board);

}

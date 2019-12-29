package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
public class Knight extends Piece {

    Knight(PlayerColor playerColor) {
        super(playerColor,PieceType.KNIGHT);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        int[] dx = {-2, -2, -1, 1, 2, 2, 1, -1};
        int[] dy = {-1, 1, 2, 2, 1, -1, -2, -2};

        for (int i = 0; i < 8; i++) {
            int newPositionX = initialPosition.getX() + dx[i];
            int newPositionY = initialPosition.getY() + dy[i];

            var position = new Position(newPositionX, newPositionY);
            if (position.isWithinBounds() && board.isTakenPositionMovable(position,getPlayerColor())) {
                availableMoves.add(position);
            }
        }
        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {

        int dx = Math.abs(currentPosition.getX() - destinationPosition.getX());
        int dy = Math.abs(currentPosition.getY() - destinationPosition.getY());

        return (dx == 1 && dy == 2 || dx == 2 && dy == 1);
    }
}

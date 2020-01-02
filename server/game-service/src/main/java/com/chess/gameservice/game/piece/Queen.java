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
public class Queen extends Piece {
    Queen(PlayerColor playerColor) {
        super(playerColor,PieceType.QUEEN);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {

        var availableMoves = new ArrayList<Position>();

        int[] dx = {1, 1, 0, -1, -1, -1, 0, 1};
        int[] dy = {0, 1, 1, 1, 0, -1, -1, -1};


        for (int i = 0; i < dx.length; i++) {
            availableMoves.addAll(getMovesInDirection(board, initialPosition, dx[i], dy[i]));
        }

        return availableMoves;

        //TODO REFACTOR
//        int [][]dxdy={{1,0},{1,1},{0,1},{-1,1},{-1,0},{-1,-1},{0,-1},{1,-1}};
//
//        ArrayList<Position> positions= Arrays.stream(dxdy)
//                .flatMap(i->getMovesInDirection(board, initialPosition, i[0], i[1]))
//                .collect(Collectors
//                        .toCollection(ArrayList::new));

    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        if (isDiagonalMoveLegal(currentPosition, destinationPosition, board)) {
            return true;
        }
        return isLineMoveLegal(currentPosition, destinationPosition, board);
    }
}

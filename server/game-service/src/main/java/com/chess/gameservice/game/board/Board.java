package com.chess.gameservice.game.board;

import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.piece.PieceFactory;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Board {
    private static final PieceType[][] playerInitialState =
            {{PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN,
                    PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN},
                    {PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
                            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK}};

    private Piece[][] board;

    public Board() {
        board = new Piece[8][8];
        populateBoard();
    }

    private void populateBoard() {
        populateWhite();
        populateBlack();
    }

    private void populateBlack() {
        int z = 0;
        for (int i = 6; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                board[i][j] = PieceFactory.buildPiece(playerInitialState[z][j]);
            }
            z++;
        }
    }

    private void populateWhite() {
        for (int i = 1; i >= 0; i--) {
            for (int j = 7; j >= 0; j--) {
                board[1 - i][j] = PieceFactory.buildPiece(playerInitialState[i][j]);
            }
        }
    }

    public boolean isBoardPositionEmpty(Position position) {
        return board[position.getX()][position.getY()] == null;
    }

    public ArrayList<Position> getAvailableMoves(Position position) {
        return board[position.getX()][position.getY()].getAvailableMoves(this, position);
    }
}

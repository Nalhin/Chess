package com.chess.gameservice.game.board;

import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.piece.PieceFactory;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@EqualsAndHashCode
public class Board {
    private static final PieceType[][] playerInitialState =
            {{PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN,
                    PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN},
                    {PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
                            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK}};

    private Piece[][] state;

    public Board() {
        state = new Piece[8][8];
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
                state[i][j] = PieceFactory.buildPiece(playerInitialState[z][j], PlayerColor.BLACK);
            }
            z++;
        }
    }

    private void populateWhite() {
        for (int i = 1; i >= 0; i--) {
            for (int j = 7; j >= 0; j--) {
                state[1 - i][j] = PieceFactory.buildPiece(playerInitialState[i][j], PlayerColor.WHITE);
            }
        }
    }

    public boolean isBoardPositionEmpty(Position position) {
        return state[position.getX()][position.getY()] == null;
    }

    public ArrayList<Position> getAvailableMoves(Position position) {
        var piece = state[position.getX()][position.getY()];
        if (piece != null) {
            return state[position.getX()][position.getY()].getAvailableMoves(this, position);
        }
        return new ArrayList<>();
    }

    public void movePiece(Position initialPosition, Position destination) {
        var piece = state[initialPosition.getX()][initialPosition.getY()];

        if (piece.isMoveLegal(initialPosition, destination, this)) {
            state[destination.getX()][destination.getY()] = piece;
            state[initialPosition.getX()][initialPosition.getY()] = null;
        } else throw new IllegalArgumentException("Illegal move.");
    }
}

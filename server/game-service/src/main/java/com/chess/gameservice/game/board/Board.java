package com.chess.gameservice.game.board;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.graveyard.Graveyards;
import com.chess.gameservice.game.piece.*;
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
    private final PieceType[][] playerInitialState =
            {{PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN,
                    PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN},
                    {PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
                            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK}};

    private Graveyards graveyards = new Graveyards();
    private Piece[][] state;

    public Board() {
        state = new Piece[8][8];
        populateBoard();
    }

    private void populateBoard() {
        populateWhite();
        populateBlack();
    }

    private void populateWhite() {
        int z = 0;
        for (int i = 6; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                state[i][j] = PieceFactory.buildPiece(playerInitialState[z][j], PlayerColor.WHITE);
            }
            z++;
        }
    }

    private void populateBlack() {
        for (int i = 1; i >= 0; i--) {
            for (int j = 7; j >= 0; j--) {
                state[1 - i][j] = PieceFactory.buildPiece(playerInitialState[i][j], PlayerColor.BLACK);
            }
        }
    }

    private Piece getPieceByPosition(Position position) {
        return state[position.getX()][position.getY()];
    }

    public boolean isBoardPositionEmpty(Position position) {
        return state[position.getX()][position.getY()] == null;
    }

    public boolean isTakenPositionMovable(Position initialPosition, PlayerColor playerColor) {
        if (isBoardPositionEmpty(initialPosition)) {
            return true;
        }
        if (isPositionTakenByAttackableEnemy(initialPosition, playerColor)) {
            return true;
        }
        return false;
    }

    public boolean isPositionTakenByAttackableEnemy(Position initialPosition, PlayerColor playerColor) {
        return !isBoardPositionEmpty(initialPosition) && isPositionTakenByEnemy(initialPosition, playerColor) && isEnemyAttackable(initialPosition);
    }

    private boolean isPositionTakenByEnemy(Position initialPosition, PlayerColor playerColor) {
        return getPieceByPosition(initialPosition).getPlayerColor() != playerColor;
    }

    private boolean isEnemyAttackable(Position initialPosition) {
        if (getPieceByPosition(initialPosition) instanceof King) {
            return false;
        }
        return true;
    }


    public ArrayList<Position> getAvailableMoves(Position position, PlayerColor playerColor) throws GameException {
        var piece = getPieceByPosition(position);

        if (piece == null) {
            throw GameException.builder().message("No piece selected.").build();
        }

        if (piece.getPlayerColor() != playerColor) {
            throw GameException.builder().message("Wrong piece color.").build();
        }

        return piece.getAvailableMoves(this, position);
    }

    public void movePiece(Position initialPosition, Position destination, PlayerColor playerColor) throws GameException {
        var piece = getPieceByPosition(initialPosition);

        if (piece == null) {
            throw GameException.builder().message("No piece selected.").build();
        }

        if (piece.getPlayerColor() != playerColor) {
            throw GameException.builder().message("Wrong piece color.").build();
        }

        if (piece.isMoveImpossible(initialPosition, destination)) {
            throw GameException.builder().message("Illegal move.").build();
        }

        if (!isTakenPositionMovable(destination, piece.getPlayerColor())) {
            throw GameException.builder().message("Illegal move.").build();
        }

        if (!piece.isMoveLegal(initialPosition, destination, this)) {
            throw GameException.builder().message("Illegal move.").build();
        }

        var removedPiece = getPieceByPosition(destination);

        if (removedPiece != null) {
            graveyards.addPieceToCorrectGraveyard(removedPiece);
        }

        state[destination.getX()][destination.getY()] = piece;
        state[initialPosition.getX()][initialPosition.getY()] = null;

        if (piece instanceof Pawn) {
            ((Pawn) piece).setFirstMove(false);
        }
    }

    public boolean isCheck() {
        return false;
    }

}

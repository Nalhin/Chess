package com.chess.gameservice.game.board;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.CheckState;
import com.chess.gameservice.game.graveyard.Graveyards;
import com.chess.gameservice.game.piece.*;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;

@Getter
@Setter
@EqualsAndHashCode
public class Board {
    public static final int BOARD_SIZE = 7;
    private final PieceType[][] playerInitialState =
            {{PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN,
                    PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN},
                    {PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
                            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK}};

    private Graveyards graveyards;
    Position positionAwaitingPromotion;
    private Piece[][] state;

    public Board() {
        graveyards = new Graveyards();
        state = new Piece[BOARD_SIZE + 1][BOARD_SIZE + 1];
        populateBoard();
    }

    private void populateBoard() {
        populateWhite();
        populateBlack();
    }

    private void populateWhite() {
        int z = 0;
        for (int i = 6; i <= BOARD_SIZE; i++) {
            for (int j = 0; j <= BOARD_SIZE; j++) {
                state[i][j] = PieceFactory.buildPiece(playerInitialState[z][j], PlayerColor.WHITE);
            }
            z++;
        }
    }

    private void populateBlack() {
        for (int i = 1; i >= 0; i--) {
            for (int j = BOARD_SIZE; j >= 0; j--) {
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
        return isPositionTakenByEnemy(initialPosition, playerColor);
    }

    public boolean isPositionTakenByAttackableEnemy(Position initialPosition, PlayerColor playerColor) {
        return !isBoardPositionEmpty(initialPosition) && isPositionTakenByEnemy(initialPosition, playerColor) && isEnemyAttackable(initialPosition);
    }

    private boolean isPositionTakenByEnemy(Position initialPosition, PlayerColor playerColor) {
        return getPieceByPosition(initialPosition).getPlayerColor() != playerColor;
    }

    private boolean isEnemyAttackable(Position initialPosition) {
        return !(getPieceByPosition(initialPosition) instanceof King);
    }


    public ArrayList<Position> getAvailableMoves(Position position, PlayerColor playerColor) throws GameException {
        var piece = getPieceByPosition(position);

        if (piece == null) {
            throw new GameException("No piece selected.");
        }

        if (piece.getPlayerColor() != playerColor) {
            throw new GameException("Wrong piece color.");
        }

        return piece.getAvailableMoves(this, position);
    }

    public void movePiece(Position initialPosition, Position destination, PlayerColor playerColor, CheckState checkState) throws GameException {
        var piece = getPieceByPosition(initialPosition);

        if (piece == null) {
            throw new GameException("No piece selected.");
        }

        if (piece.getPlayerColor() != playerColor) {
            throw new GameException("Wrong piece color.");
        }

        if (piece.isMoveImpossible(initialPosition, destination)) {
            throw new GameException("Illegal move.");
        }

        if (!isTakenPositionMovable(destination, piece.getPlayerColor())) {
            throw new GameException("Illegal move.");
        }

        if (!piece.isMoveLegal(initialPosition, destination, this)) {
            throw new GameException("Illegal move.");
        }

        if (checkPersistsAfterMove(initialPosition, destination)) {
            throw new GameException("Move ends with check.");
        }

        var removedPiece = getPieceByPosition(destination);

        if (removedPiece != null) {
            graveyards.addPieceToCorrectGraveyard(removedPiece);
        }

        state[destination.getX()][destination.getY()] = piece;
        state[initialPosition.getX()][initialPosition.getY()] = null;

        if (piece instanceof Pawn) {
            ((Pawn) piece).setFirstMove(false);
            if (destination.getX() == 0 || destination.getX() == BOARD_SIZE) {
                positionAwaitingPromotion = destination;
            }
        }
    }

    private boolean checkPersistsAfterMove(Position initialPosition, Position destinationPosition) {

        var piece = getPieceByPosition(initialPosition);
        var removedPiece = getPieceByPosition(destinationPosition);


        state[destinationPosition.getX()][destinationPosition.getY()] = piece;
        state[initialPosition.getX()][initialPosition.getY()] = null;

        boolean persists = getCheckState(PlayerColor.getOtherColor(piece.getPlayerColor())) != CheckState.NONE;

        state[destinationPosition.getX()][destinationPosition.getY()] = removedPiece;
        state[initialPosition.getX()][initialPosition.getY()] = piece;

        return persists;
    }

    public CheckState getCheckState(PlayerColor currentPlayerColor) {
        Position kingPosition = null;
        ArrayList<Position> currentPlayerPositions = new ArrayList<>();
        HashSet<Position> positionsAttackableByCurrentPlayer = new HashSet<>();

        for (int i = 0; i <= BOARD_SIZE; i++) {
            for (int j = 0; j <= BOARD_SIZE; j++) {
                Piece piece = state[i][j];
                if (piece == null) {
                    continue;
                }

                if (piece.getPlayerColor() == currentPlayerColor) {
                    Position position = new Position(i, j);

                    currentPlayerPositions.add(position);
                } else if (piece instanceof King) {
                    kingPosition = new Position(i, j);
                }
            }
        }


        for (Position position : currentPlayerPositions) {
            Piece piece = getPieceByPosition(position);
            positionsAttackableByCurrentPlayer.addAll(piece.getAvailableMoves(this, position));
        }

        if (positionsAttackableByCurrentPlayer.contains(kingPosition)) {
            Piece king = getPieceByPosition(kingPosition);
            ArrayList<Position> kingMoves = king.getAvailableMoves(this, kingPosition);

            if (positionsAttackableByCurrentPlayer.containsAll(kingMoves)) {
                return CheckState.CHECK_MATE;
            }
            return CheckState.CHECK;
        }
        return CheckState.NONE;
    }

    public void makePromotion(Position position, PlayerColor playerColor, PieceType selectedPromotion) throws GameException {
        Piece piece = getPieceByPosition(position);
        Piece promotedPiece = PieceFactory.buildPiece(selectedPromotion, playerColor);

        if (positionAwaitingPromotion == null) {
            throw new GameException("No pawn awaiting promotion.");
        }
        if (!(piece instanceof Pawn)) {
            throw new GameException("Piece is not a pawn.");
        }
        if (playerColor != piece.getPlayerColor()) {
            throw new GameException("Invalid pawn color.");
        }
        if (promotedPiece == null || promotedPiece instanceof Pawn) {
            throw new GameException("Invalid piece type.");
        }

        state[position.getX()][position.getY()] = promotedPiece;
        positionAwaitingPromotion = null;
    }

}

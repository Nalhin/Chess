package com.chess.gameservice.game.board;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.graveyard.Graveyards;
import com.chess.gameservice.game.piece.*;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.EnumMap;

@Getter
@Setter
@EqualsAndHashCode
public class Board {
    @JsonIgnore
    public static final int BOARD_SIZE = 7;
    @JsonIgnore
    public static final int BOTTOM_ROW = 0;
    @JsonIgnore
    private final PieceType[][] playerInitialState =
            {{PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN,
                    PieceType.PAWN, PieceType.PAWN, PieceType.PAWN, PieceType.PAWN},
                    {PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
                            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK}};

    private Graveyards graveyards;
    Position positionAwaitingPromotion;
    private Piece[][] state;
    private CheckState checkState;
    private EnumMap<PlayerColor, Position> kingPositions = new EnumMap<>(PlayerColor.class);

    @JsonIgnore
    Position enPessantPosition;

    public Board() {
        graveyards = new Graveyards();
        state = new Piece[BOARD_SIZE + 1][BOARD_SIZE + 1];
        checkState = CheckState.NONE;
        populateBoard();
    }

    private void populateBoard() {
        populateWhite();
        populateBlack();
        setKingPosition(PlayerColor.BLACK, new Position(0, 4));
        setKingPosition(PlayerColor.WHITE, new Position(7, 4));
    }

    public void setKingPosition(PlayerColor kingColor, Position position) {
        kingPositions.put(kingColor, position);
    }

    public Position getKingPosition(PlayerColor kingColor) {
        return kingPositions.get(kingColor);
    }

    private void populateWhite() {
        int z = 0;
        for (int x = 6; x <= BOARD_SIZE; x++) {
            for (int y = 0; y <= BOARD_SIZE; y++) {
                state[x][y] = PieceFactory.buildPiece(playerInitialState[z][y], PlayerColor.WHITE);
            }
            z++;
        }
    }

    private void populateBlack() {
        for (int x = 1; x >= 0; x--) {
            for (int y = BOARD_SIZE; y >= 0; y--) {
                state[1 - x][y] = PieceFactory.buildPiece(playerInitialState[x][y], PlayerColor.BLACK);
            }
        }
    }

    public void setBoardPosition(Position position, Piece piece) {
        state[position.getX()][position.getY()] = piece;
    }

    public Piece getPieceByPosition(Position position) {
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

    public boolean isPositionAttackable(Position initialPosition, PlayerColor playerColor) {
        return !isBoardPositionEmpty(initialPosition) && isPositionTakenByEnemy(initialPosition, playerColor);
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

    public Piece movePiece(Position initialPosition, Position destination, PlayerColor playerColor) throws GameException {
        var piece = getPieceByPosition(initialPosition);

        if (piece == null) {
            throw new GameException("No piece selected.");
        }

        if (piece.getPlayerColor() != playerColor) {
            throw new GameException("Invalid piece color.");
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

        if (CheckChecker.willMoveResultInCheck(this, initialPosition, destination)) {
            throw new GameException("Move ends with check.");
        }

        addPieceToGraveyardByPosition(destination);

        piece.makeMove(initialPosition, destination, this);
        setCheckState(CheckChecker.getCheckState(this, PlayerColor.getOtherColor(piece.getPlayerColor())));
        return piece;
    }

    public void addPieceToGraveyardByPosition(Position position) {
        Piece removedPiece = getPieceByPosition(position);

        if (removedPiece != null) {
            graveyards.addPieceToCorrectGraveyard(removedPiece);
        }
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
        if (promotedPiece instanceof Pawn) {
            throw new GameException("Invalid piece type.");
        }

        setBoardPosition(position, promotedPiece);
        positionAwaitingPromotion = null;
    }

}

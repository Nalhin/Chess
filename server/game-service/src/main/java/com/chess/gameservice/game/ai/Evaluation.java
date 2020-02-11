package com.chess.gameservice.game.ai;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;

import java.util.EnumMap;

public class Evaluation {

    private final int[][] PAWN_POSITION_VALUES = {{0, 0, 0, 0, 0, 0, 0, 0},
            {50, 50, 50, 50, 50, 50, 50, 50},
            {10, 10, 20, 30, 30, 20, 10, 10},
            {5, 5, 10, 25, 25, 10, 5, 5},
            {0, 0, 0, 20, 20, 0, 0, 0},
            {5, -5, -10, 0, 0, -10, -5, 5},
            {5, 10, 10, -20, -20, 10, 10, 5},
            {0, 0, 0, 0, 0, 0, 0, 0}};

    private final int[][] KNIGHT_POSITION_VALUES = {{-50, -40, -30, -30, -30, -30, -40, -50},
            {-40, -20, 0, 0, 0, 0, -20, -40},
            {-30, 0, 10, 15, 15, 10, 0, -30},
            {-30, 5, 15, 20, 20, 15, 5, -30},
            {-30, 0, 15, 20, 20, 15, 0, -30},
            {-30, 5, 10, 15, 15, 10, 5, -30},
            {-40, -20, 0, 5, 5, 0, -20, -40},
            {-50, -40, -30, -30, -30, -30, -40, -50}};

    public final int[][] BISHOP_POSITION_VALUES = {{-20, -10, -10, -10, -10, -10, -10, -20},
            {-10, 0, 0, 0, 0, 0, 0, -10},
            {-10, 0, 5, 10, 10, 5, 0, -10},
            {-10, 5, 5, 10, 10, 5, 5, -10},
            {-10, 0, 10, 10, 10, 10, 0, -10},
            {-10, 10, 10, 10, 10, 10, 10, -10},
            {-10, 5, 0, 0, 0, 0, 5, -10},
            {-20, -10, -10, -10, -10, -10, -10, -20}};

    private final int[][] ROOK_POSITION_VALUES = {{0, 0, 0, 0, 0, 0, 0, 0},
            {5, 10, 10, 10, 10, 10, 10, 5},
            {-5, 0, 0, 0, 0, 0, 0, -5},
            {-5, 0, 0, 0, 0, 0, 0, -5},
            {-5, 0, 0, 0, 0, 0, 0, -5},
            {-5, 0, 0, 0, 0, 0, 0, -5},
            {-5, 0, 0, 0, 0, 0, 0, -5},
            {0, 0, 0, 5, 5, 0, 0, 0}};

    private final int[][] QUEEN_POSITION_VALUES = {{-20, -10, -10, -5, -5, -10, -10, -20},
            {-10, 0, 0, 0, 0, 0, 0, -10},
            {-10, 0, 5, 5, 5, 5, 0, -10},
            {-5, 0, 5, 5, 5, 5, 0, -5},
            {0, 0, 5, 5, 5, 5, 0, -5},
            {-10, 5, 5, 5, 5, 5, 0, -10},
            {-10, 0, 5, 0, 0, 0, 0, -10},
            {-20, -10, -10, -5, -5, -10, -10, -20}};

    private final int[][] KING_POSITION_VALUES = {{-30, -40, -40, -50, -50, -40, -40, -30},
            {-30, -40, -40, -50, -50, -40, -40, -30},
            {-30, -40, -40, -50, -50, -40, -40, -30},
            {-30, -40, -40, -50, -50, -40, -40, -30},
            {-20, -30, -30, -40, -40, -30, -30, -20},
            {-10, -20, -20, -20, -20, -20, -20, -10},
            {20, 20, 0, 0, 0, 0, 20, 20},
            {20, 30, 10, 0, 0, 10, 30, 20}};

    private final EnumMap<PieceType, int[][]> piecePositionValuesBlack = new EnumMap<>(PieceType.class);

    {
        piecePositionValuesBlack.put(PieceType.PAWN, PAWN_POSITION_VALUES);
        piecePositionValuesBlack.put(PieceType.KNIGHT, KNIGHT_POSITION_VALUES);
        piecePositionValuesBlack.put(PieceType.BISHOP, BISHOP_POSITION_VALUES);
        piecePositionValuesBlack.put(PieceType.ROOK, ROOK_POSITION_VALUES);
        piecePositionValuesBlack.put(PieceType.QUEEN, QUEEN_POSITION_VALUES);
        piecePositionValuesBlack.put(PieceType.KING, KING_POSITION_VALUES);
    }

    private final EnumMap<PieceType, Integer> pieceValues = new EnumMap<>(PieceType.class);

    {
        pieceValues.put(PieceType.PAWN, 100);
        pieceValues.put(PieceType.KNIGHT, 320);
        pieceValues.put(PieceType.BISHOP, 330);
        pieceValues.put(PieceType.ROOK, 500);
        pieceValues.put(PieceType.QUEEN, 900);
        pieceValues.put(PieceType.KING, 20000);
    }

    public int getPositionValue(Piece piece, Position position) {
        int pieceValue = pieceValues.get(piece.getType());
        if (piece.getPlayerColor() == PlayerColor.BLACK) {
            return pieceValue + piecePositionValuesBlack.get(piece.getType())[position.getX()][position.getY()];
        }
        return pieceValue + piecePositionValuesBlack.get(piece.getType())[Board.BOARD_SIZE - position.getX()][position.getY()];
    }

    public int calculateBoardValue(Board board, PlayerColor playerColor) {
        int value = 0;

        for (int i = 0; i < Board.BOARD_SIZE; i++) {
            for (int j = 0; j < Board.BOARD_SIZE; j++) {
                Position position = new Position(i, j);
                Piece piece = board.getPieceByPosition(position);
                if (piece != null) {
                    int mul = piece.getPlayerColor() == playerColor ? 1 : -1;
                    value += mul * getPositionValue(piece, position);
                }
            }
        }
        return value;
    }
}

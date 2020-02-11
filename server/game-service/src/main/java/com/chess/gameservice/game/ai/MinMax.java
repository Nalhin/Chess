package com.chess.gameservice.game.ai;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.board.CheckState;
import com.chess.gameservice.game.move.PlayerMove;
import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;
import java.util.Collections;


public class MinMax {

    private final int DEPTH = 4;
    private final PlayerColor AI_COLOR = PlayerColor.BLACK;

    private final Evaluation evaluation = new Evaluation();

    private ArrayList<PlayerMove> generatePlayerMoves(Board board, PlayerColor playerColor) {
        ArrayList<PlayerMove> moves = new ArrayList<>();
        for (int i = 0; i <= Board.BOARD_SIZE; i++) {
            for (int j = 0; j <= Board.BOARD_SIZE; j++) {
                Position position = new Position(i, j);
                Piece piece = board.getPieceByPosition(position);
                if (piece != null && piece.getPlayerColor() == playerColor) {
                    try {
                        for (Position move : board.getAvailableMoves(position, playerColor)) {
                            moves.add(PlayerMove.builder().initialPosition(position).destinationPosition(move).build());
                        }
                    } catch (GameException ignored) {
                    }
                }
            }
        }
        return moves;
    }

    public PlayerMove getBestMove(Board board, PlayerColor playerColor) {
        return negamaxRoot(Integer.MIN_VALUE + 1, Integer.MAX_VALUE, DEPTH, board, playerColor);

    }

    private PlayerMove negamaxRoot(int alpha, int beta, int depth, Board board, PlayerColor playerColor) {
        ArrayList<PlayerMove> moves = generatePlayerMoves(board, playerColor);
        PlayerMove bestMove = null;
        int bestValue = Integer.MIN_VALUE + 1;

        Collections.shuffle(moves);
        for (PlayerMove pieceMove : moves) {
            Board newBoard;
            try {
                newBoard = board.deepCopy();
                newBoard.movePiece(pieceMove.getInitialPosition(), pieceMove.getDestinationPosition(), playerColor);
                if (bestMove == null) {
                    bestMove = pieceMove;
                }
            } catch (Exception exception) {
                continue;
            }
            int value = -negamax(-beta, -alpha, depth - 1, newBoard, PlayerColor.getOtherColor(playerColor));

            if (value > bestValue) {
                bestMove = pieceMove;
                bestValue = value;
            }
            alpha = Math.max(alpha, value);
            if (bestValue >= beta) {
                break;
            }
        }
        return bestMove;
    }


    private int negamax(int alpha, int beta, int depth, Board board, PlayerColor playerColor) {
        if (depth == 0 || board.getCheckState() == CheckState.CHECK_MATE) {
            int value = playerColor == AI_COLOR ? 1 : -1;
            return value * evaluation.calculateBoardValue(board, playerColor);
        }
        ArrayList<PlayerMove> moves = generatePlayerMoves(board, playerColor);
        Collections.shuffle(moves);
        int value = Integer.MIN_VALUE + 1;
        for (PlayerMove pieceMove : moves) {
            Board newBoard;
            try {
                newBoard = board.deepCopy();
                newBoard.movePiece(pieceMove.getInitialPosition(), pieceMove.getDestinationPosition(), playerColor);
            } catch (Exception exception) {
                continue;
            }

            int res = -negamax(-beta, -alpha, depth - 1, newBoard, PlayerColor.getOtherColor(playerColor));
            if (res > value) {
                value = res;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
                break;
            }
        }
        return alpha;
    }

}


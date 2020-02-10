package com.chess.gameservice.game.ai;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.board.CheckState;
import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;

import java.io.IOException;
import java.util.ArrayList;


public class MinMax {

    private final int DEPTH = 3;

    private final Evaluation evaluation = new Evaluation();


    private ArrayList<ArrayList<Position>> generatePlayerMoves(Board board, PlayerColor playerColor) {
        ArrayList<ArrayList<Position>> moves = new ArrayList<>();
        for (int i = 0; i <= Board.BOARD_SIZE; i++) {
            for (int j = 0; j <= Board.BOARD_SIZE; j++) {
                Position position = new Position(i, j);
                Piece piece = board.getPieceByPosition(position);
                if (piece != null && piece.getPlayerColor() == playerColor) {
                    try {
                        ArrayList<Position> ava = new ArrayList<>();
                        ava.add(position);
                        ava.addAll(board.getAvailableMoves(position, playerColor));
                        moves.add(ava);
                    } catch (GameException ignored) {
                    }
                }
            }
        }
        return moves;
    }

    public MinMaxReturn getBestMove(Board board, PlayerColor playerColor) throws IOException, ClassNotFoundException {
        MinMaxReturn minMaxReturn = minMaxInitial(Integer.MIN_VALUE, Integer.MAX_VALUE, DEPTH, playerColor, board);
        System.out.println(minMaxReturn.getValue());
        return minMaxReturn;
    }

    private MinMaxReturn minMaxInitial(int alpha, int beta, int depth, PlayerColor playerColor, Board board) throws IOException, ClassNotFoundException {
        MinMaxReturn minMaxReturn = new MinMaxReturn();

        ArrayList<ArrayList<Position>> moves = generatePlayerMoves(board, playerColor);
        for (int i = 0; i < moves.size(); i++) {
            for (int j = 1; j < moves.get(i).size(); j++) {
                Board newBoard = board.deepCopy();
                try {
                    newBoard.movePiece(moves.get(i).get(0), moves.get(i).get(j), playerColor);
                } catch (GameException exception) {
                    continue;
                }
                int value = alphaBetaMin(alpha, beta, depth - 1, PlayerColor.getOtherColor(playerColor), newBoard);
                if (value >= alpha) {
                    alpha =  value;
                    minMaxReturn.setValue(value);
                    minMaxReturn.setInitialPosition(moves.get(i).get(0));
                    minMaxReturn.setDestinationPosition(moves.get(i).get(j));
                }
            }
        }
        return minMaxReturn;
    }

    int alphaBetaMax(int alpha, int beta, int depth, PlayerColor playerColor, Board board) throws IOException, ClassNotFoundException {
        if (depth == 0 || board.getCheckState()== CheckState.CHECK_MATE) {
            return evaluation.calculateBoardValue(board, playerColor);
        }
        ArrayList<ArrayList<Position>> moves = generatePlayerMoves(board, playerColor);
        for (int i = 0; i < moves.size(); i++) {
            for (int j = 1; j < moves.get(i).size(); j++) {
                Board newBoard = board.deepCopy();
                try {
                    newBoard.movePiece(moves.get(i).get(0), moves.get(i).get(j), playerColor);
                } catch (GameException exception) {
                    continue;
                }
                int value = alphaBetaMin(alpha, beta, depth - 1, PlayerColor.getOtherColor(playerColor), newBoard);
                if (value >= beta) {
                    return beta;
                }
                alpha = Math.max(alpha, value);
            }
        }
        return alpha;
    }

    int alphaBetaMin(int alpha, int beta, int depth, PlayerColor playerColor, Board board) throws IOException, ClassNotFoundException {
        if (depth == 0 || board.getCheckState()== CheckState.CHECK_MATE) {
            return -evaluation.calculateBoardValue(board, playerColor);
        }
        ArrayList<ArrayList<Position>> moves = generatePlayerMoves(board, playerColor);
        for (int i = 0; i < moves.size(); i++) {
            for (int j = 1; j < moves.get(i).size(); j++) {
                Board newBoard = board.deepCopy();
                try {
                    newBoard.movePiece(moves.get(i).get(0), moves.get(i).get(j), playerColor);
                } catch (GameException exception) {
                    continue;
                }
                int value = alphaBetaMax(alpha, beta, depth - 1, PlayerColor.getOtherColor(playerColor), newBoard);
                if (value <= alpha) {
                    return alpha;
                }
                beta = Math.min(beta, value);
            }
        }
        return beta;
    }
}


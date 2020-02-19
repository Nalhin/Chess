package com.chess.gameservice.game.ai;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.move.PlayerMove;
import com.chess.gameservice.game.player.PlayerColor;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class MinMaxTest {

    @Test
    void getScore() {
        Board board = new Board();
        MinMax minMax = new MinMax();

        PlayerMove score =minMax.getBestMove(board, PlayerColor.WHITE);

        assertNotNull(score);
    }
}
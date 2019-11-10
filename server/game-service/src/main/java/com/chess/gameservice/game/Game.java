package com.chess.gameservice.game;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.Player;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Game {
    Board board;
    Player whitePlayer;
    Player blackPlayer;

    public Game() {
        this.board = new Board();
    }
}

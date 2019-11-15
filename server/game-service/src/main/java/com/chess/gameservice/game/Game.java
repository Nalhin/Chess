package com.chess.gameservice.game;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.graveyard.Graveyards;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.Players;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Game {
    Board board = new Board();
    Players players;
    Graveyards graveyards;
    Player currentTurn;
    GameState gameState = GameState.WAITING_FOR_PLAYERS;

}

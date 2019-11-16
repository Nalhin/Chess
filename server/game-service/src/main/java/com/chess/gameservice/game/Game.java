package com.chess.gameservice.game;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.graveyard.Graveyards;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.player.Players;
import com.chess.gameservice.moves.PlayerMove;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;


@Getter
@Setter
public class Game {
    enum GameState {
        WAITING_FOR_PLAYERS, STARTED, GAME_OVER
    }

    Board board = new Board();
    Players players = new Players();
    Graveyards graveyards;
    Player currentTurn;
    GameState gameState = GameState.WAITING_FOR_PLAYERS;


    public void setRandomPlayer(Player player) {
        var random = new Random();
        var randomColor = random.nextInt(1);
        if (randomColor == PlayerColor.BLACK.value) {
            players.setBlackPlayer(player);
        } else {
            players.setWhitePlayer(player);
        }
    }

    public void setOtherPlayer(Player player) {
        if (players.getWhitePlayer() == null) {
            players.setWhitePlayer(player);
        } else {
            players.setBlackPlayer(player);
        }
    }

    public void makeMove(PlayerMove playerMove, Player player) {
        if (currentTurn.equals(player)) {
            board.movePiece(playerMove.getInitialPosition(), playerMove.getDestinationPosition());
        }
    }

    public void initGame() {
        gameState = GameState.STARTED;
        currentTurn = players.getWhitePlayer();
    }
}

package com.chess.gameservice.game;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.player.Players;
import com.chess.gameservice.moves.PlayerMove;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Game {
    enum GamePhase {
        WAITING_FOR_PLAYERS, STARTED, GAME_OVER
    }

    Board board = new Board();
    Players players = new Players();
    PlayerColor currentTurn;
    GamePhase gamePhase = GamePhase.WAITING_FOR_PLAYERS;


    public void setPlayer(Player player, PlayerColor playerColor){
        players.setPlayerByColor(player,playerColor);
    }

    public void makeMove(PlayerMove playerMove, Player player){
        if (players.getPlayerByColor(currentTurn).equals(player)) {
            board.movePiece(playerMove.getInitialPosition(), playerMove.getDestinationPosition(),currentTurn);
            changeTurn();
        }
    }

    private void changeTurn() {
        switch (currentTurn) {
            case BLACK:
                currentTurn = PlayerColor.WHITE;
                break;
            case WHITE:
                currentTurn = PlayerColor.BLACK;
                break;
        }
    }

    public void initGame() {
        gamePhase = GamePhase.STARTED;
        currentTurn = PlayerColor.WHITE;
    }
}

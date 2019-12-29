package com.chess.gameservice.game;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.player.Players;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.models.PlayerMove;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;


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


    public void setPlayer(Player player, PlayerColor playerColor) {
        players.setPlayerByColor(player, playerColor);
    }

    public void makeMove(PlayerMove playerMove, Player player) throws GameException {
        checkIfPlayerTurn(player);
        board.movePiece(playerMove.getInitialPosition(), playerMove.getDestinationPosition(), currentTurn);
        changeTurn();
    }

    private void checkIfPlayerTurn(Player player) throws GameException {
        if (!players.getPlayerByColor(currentTurn).equals(player)) {
            throw GameException.builder().message("Wrong turn.").build();
        }
    }


    public ArrayList<Position> getAvailableMoves(Position position, Player player) throws GameException {
        checkIfPlayerTurn(player);
        return board.getAvailableMoves(position, currentTurn);
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

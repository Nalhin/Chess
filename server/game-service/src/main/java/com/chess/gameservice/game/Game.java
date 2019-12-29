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


    Board board;
    Players players;
    PlayerColor currentTurn;
    GamePhase gamePhase;
    CheckState checkState;

    public Game() {
        board = new Board();
        players = new Players();
        gamePhase = GamePhase.WAITING_FOR_PLAYERS;
        checkState = CheckState.NONE;
    }

    public void setPlayer(Player player, PlayerColor playerColor) {
        players.setPlayerByColor(player, playerColor);
    }

    public void makeMove(PlayerMove playerMove, Player player) throws GameException {
        checkIfPlayerTurn(player);
        board.movePiece(playerMove.getInitialPosition(), playerMove.getDestinationPosition(), currentTurn,checkState);
        setCheckState(board.getCheckState(currentTurn));

        if (checkState == CheckState.CHECK_MATE) {
            setGamePhase(GamePhase.GAME_OVER);
        }
        setCurrentTurn(PlayerColor.getOtherColor(currentTurn));

    }

    private void checkIfPlayerTurn(Player player) throws GameException {
        if (gamePhase == GamePhase.GAME_OVER) {
            throw new GameException("Game is over.");
        }
        if (!players.getPlayerByColor(currentTurn).equals(player)) {
            throw new GameException("Wrong turn.");
        }
    }


    public ArrayList<Position> getAvailableMoves(Position position, Player player) throws GameException {
        checkIfPlayerTurn(player);
        return board.getAvailableMoves(position, currentTurn);
    }


    public void initGame() {
        gamePhase = GamePhase.STARTED;
        currentTurn = PlayerColor.WHITE;
    }
}

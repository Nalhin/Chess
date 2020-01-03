package com.chess.gameservice.game;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.board.CheckState;
import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.stopwatch.CustomStopwatch;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.player.Players;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.game.turn.CurrentTurn;
import com.chess.gameservice.game.turn.GameTurn;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;


@Getter
@Setter
public class Game {

    private Board board;
    private Players players;
    private CurrentTurn currentTurn;
    private GamePhase gamePhase;

    @JsonIgnore
    private ArrayList<GameTurn> gameTurns;

    @JsonIgnore
    private CustomStopwatch customStopwatch;

    public Game() {
        board = new Board();
        players = new Players();
        gameTurns = new ArrayList<>();
        gamePhase = GamePhase.WAITING_FOR_PLAYERS;
        currentTurn = new CurrentTurn();
        customStopwatch = new CustomStopwatch();
    }

    public void setPlayer(Player player, PlayerColor playerColor) {
        players.put(playerColor, player);
    }

    public void makeMove(PlayerMovePayload playerMovePayload, Player player) throws GameException {
        checkIfPlayerTurn(player);
        checkIfPromotionIsPending();

        Piece piece = board.movePiece(playerMovePayload.getInitialPosition(), playerMovePayload.getDestinationPosition(), currentTurn.getCurrentPlayerColor());

        if (board.getCheckState() == CheckState.CHECK_MATE) {
            setGamePhase(GamePhase.GAME_OVER);
        }

        if (board.getPositionAwaitingPromotion() == null) {
            changeTurn();
        }

        gameTurns.add(GameTurn.builder()
                .playerColor(piece.getPlayerColor())
                .initialPosition(playerMovePayload.getInitialPosition())
                .destinationPosition(playerMovePayload.getDestinationPosition())
                .turnNumber(currentTurn.getTurnNumber())
                .pieceType(piece.getType()).build());
    }

    private void checkIfPlayerTurn(Player player) throws GameException {
        if (gamePhase == GamePhase.GAME_OVER) {
            throw new GameException("Game is over.");
        }
        if (!players.get(currentTurn.getCurrentPlayerColor()).equals(player)) {
            throw new GameException("Wrong turn.");
        }
    }

    private void checkIfPromotionIsPending() throws GameException {
        if (board.getPositionAwaitingPromotion() != null) {
            throw new GameException("There is a pending promotion.");
        }
    }

    public ArrayList<Position> getAvailableMoves(Position position, Player player) throws GameException {
        checkIfPlayerTurn(player);
        checkIfPromotionIsPending();
        return board.getAvailableMoves(position, currentTurn.getCurrentPlayerColor());
    }

    public void makePromotion(Position position, Player player, PieceType selectedPromotion) throws GameException {
        checkIfPlayerTurn(player);
        board.makePromotion(position, currentTurn.getCurrentPlayerColor(), selectedPromotion);
        changeTurn();
    }

    private void changeTurn() {
        players.changeTurn(currentTurn.getCurrentPlayerColor());
        currentTurn.changeTurn();
    }

    @JsonIgnore
    public boolean isOver() {
        return gamePhase == GamePhase.GAME_OVER;
    }

    public void initGame() {
        gamePhase = GamePhase.STARTED;
        customStopwatch.start();
    }
}

package com.chess.gameservice.game;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.board.CheckState;
import com.chess.gameservice.game.move.PlayerMove;
import com.chess.gameservice.game.piece.Piece;
import com.chess.gameservice.game.piece.PieceType;
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

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Getter
@Setter
public class Game {

    private Board board;
    private Players players;
    private CurrentTurn currentTurn;
    private GamePhase gamePhase;
    private PlayerMove latestMove;
    @JsonIgnore
    private LocalDateTime startTime;
    @JsonIgnore
    private UUID gameId;
    @JsonIgnore
    private boolean withAi;

    @JsonIgnore
    private ArrayList<GameTurn> gameTurns;

    public Game() {
        board = new Board();
        players = new Players();
        gameTurns = new ArrayList<>();
        gamePhase = GamePhase.WAITING_FOR_PLAYERS;
        currentTurn = new CurrentTurn();
        latestMove = new PlayerMove();
        startTime = LocalDateTime.now();
    }

    public void setPlayer(Player player, PlayerColor playerColor) {
        players.put(playerColor, player);
    }

    public void makeMove(PlayerMovePayload playerMovePayload, Player player) throws GameException {
        checkIfPlayerTurn(player);
        checkIfPromotionIsPending();

        Piece piece = board.movePiece(playerMovePayload.getInitialPosition(),
                playerMovePayload.getDestinationPosition(),
                currentTurn.getCurrentPlayerColor());

        if (board.getCheckState() == CheckState.CHECK_MATE) {
            setGamePhase(GamePhase.GAME_OVER);
        }

        if (board.getPositionAwaitingPromotion() == null) {
            changeTurn();
        }

        latestMove = PlayerMove.builder().initialPosition(playerMovePayload.getInitialPosition())
                .destinationPosition(playerMovePayload.getDestinationPosition()).build();

        gameTurns.add(GameTurn.builder()
                .playerColor(piece.getPlayerColor())
                .initialPosition(playerMovePayload.getInitialPosition())
                .destinationPosition(playerMovePayload.getDestinationPosition())
                .turnNumber(currentTurn.getTurnNumber())
                .pieceType(piece.getType()).build());
    }

    public void makeAiMove(PlayerMovePayload playerMovePayload, Player player) throws GameException {
        makeMove(playerMovePayload, player);

        if (board.getPositionAwaitingPromotion() != null) {
            makePromotion(playerMovePayload.getDestinationPosition(), player, PieceType.QUEEN);
        }
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
        players.changeTurn(currentTurn.getCurrentPlayerColor(), gameId);
        currentTurn.changeTurn();
    }

    public void playerTimedOutOrOutOfTime() {
        setGamePhase(GamePhase.GAME_OVER);
    }


    @JsonIgnore
    public boolean isOver() {
        return gamePhase == GamePhase.GAME_OVER;
    }

    public Optional<UUID> isPlayerPresentInGame(String playerName) {
        if (getPlayers().values().stream().anyMatch(user -> user.getName().equals(playerName))) {
            return Optional.of(gameId);
        }
        return Optional.empty();
    }

    public void forfeit(String playerName) {
        PlayerColor winner = players.forfeitAndGetWinner(currentTurn.getCurrentPlayerColor(), playerName);
        if (currentTurn.getCurrentPlayerColor() != winner) {
            currentTurn.changeTurnWithoutIncrementingTurnNumber();
        }
        setGamePhase(GamePhase.GAME_OVER);
    }


    @JsonIgnore
    public Duration getGameDuration() {
        return players.getGameDuration();
    }

    @JsonIgnore
    public PlayerColor getCurrentPlayerColor() {
        return currentTurn.getCurrentPlayerColor();
    }

    @JsonIgnore
    public String getWinner() {
        return players.get(PlayerColor.getOtherColor(currentTurn.getCurrentPlayerColor())).getName();
    }

    public void initGame(UUID gameId) {
        setGamePhase(GamePhase.STARTED);
        setGameId(gameId);
    }

    public void beforeDestroy() {
        players.beforeDestroy();
    }
}

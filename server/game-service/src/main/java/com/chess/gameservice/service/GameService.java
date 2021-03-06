package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.GamePhase;
import com.chess.gameservice.game.ai.MinMax;
import com.chess.gameservice.game.move.PlayerMove;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.events.GameOverEvent;
import com.chess.gameservice.messages.external.StartGameMessage;
import com.chess.gameservice.messages.external.User;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;


@Service
public class GameService {

    private final HashMap<UUID, Game> games = new HashMap<>();
    private final MinMax minMax = new MinMax();
    private final ApplicationEventPublisher applicationEventPublisher;

    public GameService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public Optional<UUID> getGameWithUser(String playerName) {
        for (Game game : games.values()) {
            Optional<UUID> gameId = game.isPlayerPresentInGame(playerName);
            if (gameId.isPresent()) {
                return gameId;
            }
        }
        return Optional.empty();
    }

    public Game forfeitGame(UUID gameId, String playerName) throws GameException {
        Game game = games.get(gameId);
        if (game == null) {
            throw new GameException("Game is already over.");
        }
        Optional<UUID> response = game.isPlayerPresentInGame(playerName);
        if (response.isEmpty()) {
            throw new GameException("Player not in game.");
        }
        game.forfeit(playerName);
        gameFinished(gameId);
        return game;
    }

    public Optional<Game> connect(UUID gameId, String playerName) {
        synchronized (games) {
            try {
                while (!games.containsKey(gameId)) {
                    games.wait();
                }
            } catch (InterruptedException ignored) {
            }
            Game game = games.get(gameId);
            if (game == null) {
                return Optional.empty();
            }
            Optional<UUID> response = game.isPlayerPresentInGame(playerName);
            if (response.isEmpty()) {
                return Optional.empty();
            }
            return Optional.of(game);
        }
    }

    @KafkaListener(topics = "${kafka-topics.start-game}")
    public void initGame(@Payload StartGameMessage message) {
        UUID gameId = message.getGameId();
        Game game = new Game();
        ArrayList<User> players = message.getUsers();
        game.setGameId(gameId);
        game.setWithAi(message.isWithAi());
        game.setPlayer(new Player(players.get(0).getLogin()), PlayerColor.WHITE);
        game.setPlayer(new Player(players.get(1).getLogin()), PlayerColor.BLACK);
        game.initGame(gameId);
        games.put(gameId, game);
    }

    public AvailableMovesPayload getAvailableMoves(UUID gameId, Position position, String name) throws GameException {
        Game game = games.get(gameId);
        if (game == null) {
            throw new GameException("Game is already over");
        }
        Player player = new Player(name);
        AvailableMovesPayload availableMovesPayload = new AvailableMovesPayload();
        availableMovesPayload.setPosition(position);
        availableMovesPayload.setAvailableMoves(game.getAvailableMoves(position, player));
        return availableMovesPayload;
    }

    public Game makeMove(UUID gameId, PlayerMovePayload playerMovePayload, String playerName) throws GameException {
        Game game = games.get(gameId);
        Player player = new Player(playerName);
        game.makeMove(playerMovePayload, player);
        if (game.isOver()) {
            gameFinished(gameId);
        }
        return game;
    }

    public Game makePromotion(UUID gameId, Position playerMove, PieceType selectedPromotion, String playerName) throws GameException {
        Game game = games.get(gameId);
        Player player = new Player(playerName);
        game.makePromotion(playerMove, player, selectedPromotion);
        return game;
    }

    public Game playerOutOfTime(UUID gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return null;
        }
        game.playerTimedOutOrOutOfTime();
        gameFinished(gameId);
        return game;
    }

    public Game makeAiMove(UUID gameId) throws GameException {
        Game game = games.get(gameId);
        if (game == null) {
            return null;
        }
        Player player = new Player("Computer");
        if (game.getBoard().getPositionAwaitingPromotion() == null) {
            try {
                PlayerMove bestMove = minMax.getBestMove(game.getBoard(), game.getCurrentPlayerColor());
                game.makeAiMove(new PlayerMovePayload(bestMove.getInitialPosition(), bestMove.getDestinationPosition()), player);
            } catch (GameException exception) {
                forfeitGame(gameId, player.getName());
            }
        }
        if (game.getGamePhase() == GamePhase.GAME_OVER) {
            gameFinished(gameId);
        }
        return game;
    }

    @Scheduled(fixedDelay = 3600000)
    public synchronized void removeInactiveGames() {
        ArrayList<UUID> gamesToRemove = new ArrayList<>();
        games.values().forEach(game -> {
            long minutes = ChronoUnit.MINUTES.between(game.getStartTime(), LocalDateTime.now());
            if (Math.abs(minutes) > 30) {
                gamesToRemove.add(game.getGameId());
            }
        });
        gamesToRemove.forEach(this::gameFinished);
    }


    public synchronized void gameFinished(UUID gameId) {
        Game game = games.get(gameId);
        applicationEventPublisher.publishEvent(new GameOverEvent(this, game));
        game.beforeDestroy();
        games.remove(gameId);
    }
}

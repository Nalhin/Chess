package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;


@Service
public class GameService {

    private final HashMap<UUID, Game> games = new HashMap<>();
    private ApplicationEventPublisher applicationEventPublisher;

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
        Optional<UUID> response = game.isPlayerPresentInGame(playerName);
        if (response.isPresent()) {
            game.forfeit(playerName);
            gameFinished(game, gameId);
            return game;
        }
        throw new GameException("Player not in game.");
    }

    public Optional<Game> connect(UUID gameId, String playerName) throws InterruptedException {
        synchronized (games) {
            while (!games.containsKey(gameId)) {
                games.wait();
            }
            Game game = games.get(gameId);
            Optional<UUID> response = game.isPlayerPresentInGame(playerName);
            if (response.isEmpty()) {
                return Optional.empty();
            }
            return Optional.of(game);
        }
    }

    @KafkaListener(topics = "start-game")
    public void initGame(@Payload StartGameMessage message) {
        UUID gameId = message.getGameId();
        Game game = new Game();
        ArrayList<User> players = message.getUsers();
        game.setGameId(gameId);
        game.setPlayer(new Player(players.get(0).getName()), PlayerColor.WHITE);
        game.setPlayer(new Player(players.get(1).getName()), PlayerColor.BLACK);
        game.initGame(gameId);
        games.put(gameId, game);
    }

    public AvailableMovesPayload getAvailableMoves(UUID gameId, Position position, String name) throws GameException {
        Game game = games.get(gameId);
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
            gameFinished(game, gameId);
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
        game.playerTimedOutOrOutOfTime();
        gameFinished(game, gameId);
        return game;
    }

    public synchronized void gameFinished(Game game, UUID gameId) {
        applicationEventPublisher.publishEvent(new GameOverEvent(this, game));
        games.remove(gameId);
    }
}

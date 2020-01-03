package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.events.GameOverEvent;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;


@Service
public class GameService {

    private HashMap<UUID, Game> games=new HashMap<>();
    private ApplicationEventPublisher applicationEventPublisher;

    public GameService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public synchronized Game initialConnect(UUID gameId, String playerName) {
        Game game = games.get(gameId);

        if (game == null) {
            game = new Game();
            game.setGameId(gameId);
            var player = new Player(playerName);
            game.setPlayer(player, PlayerColor.WHITE);
            games.put(gameId, game);
            return null;
        }

        var player = new Player(playerName);
        game.setPlayer(player, PlayerColor.BLACK);
        game.initGame(gameId);

        return game;
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

    public Game playerOutOfTime(UUID gameId){
        Game game = games.get(gameId);
        game.playerTimedOutOrOutOfTime();
        gameFinished(game, gameId);
        return game;
    }

    @Async
    public void gameFinished(Game game, UUID gameId) {
        applicationEventPublisher.publishEvent(new GameOverEvent(this, game));
        games.remove(gameId);
    }
}

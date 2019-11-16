package com.chess.gameservice.service;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.moves.AvailableMoves;
import com.chess.gameservice.moves.PlayerMove;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;


@Service
public class GameService {

    private HashMap<UUID, Game> games = new HashMap<>();

    public synchronized Game initialConnect(UUID gameId, String playerName) {
        Game game = games.get(gameId);

        if (game == null) {
            games.put(gameId, null);
            game = new Game();
            var player = new Player(playerName);
            game.setRandomPlayer(player);
            games.put(gameId, game);

            return null;
        }

        var player = new Player(playerName);
        game.setOtherPlayer(player);
        game.initGame();

        return game;
    }

    public AvailableMoves getAvailableMoves(UUID gameId, Position position) {
        var game = games.get(gameId);
        var availableMoves = new AvailableMoves();
        availableMoves.setAvailableMoves(game.getBoard().getAvailableMoves(position));
        return availableMoves;
    }

    public Game makeMove(UUID gameId, PlayerMove playerMove, String playerName) {
        var game = games.get(gameId);
        var player = new Player(playerName);
        game.makeMove(playerMove, player);

        return game;
    }
}

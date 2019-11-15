package com.chess.gameservice.service;

import com.chess.gameservice.availablemoves.AvailableMoves;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;


@Service
public class GameService {

    private HashMap<UUID, Game> games = new HashMap<>();

    public Board createGame(UUID gameId) {
        var game = new Game();
        games.put(gameId, new Game());

        return game.getBoard();
    }

    public AvailableMoves getAvailableMoves(UUID gameId, Position position) {
        var game = games.get(gameId);
        var availableMoves = new AvailableMoves();
        availableMoves.setAvailableMoves(game.getBoard().getAvailableMoves(position));
        return availableMoves;
    }

    public Board move(UUID gameId, Position initialPosition, Position destinationPosition) {
        var game = games.get(gameId);
        var board = game.getBoard();

        board.movePiece(initialPosition, destinationPosition);

        return board;
    }
}

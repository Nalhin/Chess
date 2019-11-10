package com.chess.gameservice.controller;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.models.AvailableMoves;
import com.chess.gameservice.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class GameController {

    private GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    private Position coordsToPosition(String coords) {
        var coordinate = coords.split("#");
        var position = new Position(Integer.parseInt(coordinate[0]), Integer.parseInt(coordinate[1]));

        return position;
    }

    @MessageMapping("/create/{gameId}")
    @SendTo("/topic/board/{gameId}")
    public Board createGame(@DestinationVariable String gameId) throws IllegalArgumentException {
        var boardState = gameService.createGame(UUID.fromString(gameId));

        return boardState;
    }

    @MessageMapping("/move/{gameId}/{initial}/{destination}")
    @SendTo("/topic/move/{gameId}")
    public Board move(@DestinationVariable String gameId, @DestinationVariable String initial, @DestinationVariable String destination) throws IllegalArgumentException {

        var boardState = gameService.move((UUID.fromString(gameId)), coordsToPosition(initial), coordsToPosition(destination));
        return boardState;
    }


    @MessageMapping("/available-moves/{gameId}/{initial}")
    @SendTo("/topic/available-moves/{gameId}")
    public AvailableMoves getAvailableMoves(@DestinationVariable String gameId, @DestinationVariable String initial) throws IllegalArgumentException {

        var availableMoves = gameService.getAvailableMoves((UUID.fromString(gameId)), coordsToPosition(initial));

        return availableMoves;
    }
}

package com.chess.gameservice.controller;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class GameController {

    private GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public GameController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    private Position coordsToPosition(String coords) {
        var coordinate = coords.split("#");
        var position = new Position(Integer.parseInt(coordinate[0]), Integer.parseInt(coordinate[1]));

        return position;
    }

    @MessageMapping("/create/{gameId}")
    @SendTo("/topic/board/{gameId}")
    public Board createGame(@DestinationVariable String gameId) {
        var boardState = gameService.createGame(UUID.fromString(gameId));

        return boardState;
    }

    @MessageMapping("/move/{gameId}/{initial}/{destination}")
    @SendTo("/topic/move/{gameId}")
    public Board move(@DestinationVariable String gameId, @DestinationVariable String initial, @DestinationVariable String destination) {

        var boardState = gameService.move((UUID.fromString(gameId)), coordsToPosition(initial), coordsToPosition(destination));
        return boardState;
    }


    @MessageMapping("/available-moves/{gameId}/{initial}")
    public void getAvailableMoves(@DestinationVariable String gameId, @DestinationVariable String initial,
                                  @Header("simpSessionId") String sessionId) {

        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);

        var availableMoves = gameService.getAvailableMoves((UUID.fromString(gameId)), coordsToPosition(initial));

        simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/available-moves/" + gameId, availableMoves,
                headerAccessor.getMessageHeaders());
    }
}

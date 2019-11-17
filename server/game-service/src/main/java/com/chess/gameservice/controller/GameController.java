package com.chess.gameservice.controller;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.AvailableMovesMessage;
import com.chess.gameservice.messages.GameStartedMessage;
import com.chess.gameservice.messages.Message;
import com.chess.gameservice.messages.PlayerMovedMessage;
import com.chess.gameservice.moves.AvailableMoves;
import com.chess.gameservice.moves.PlayerMove;
import com.chess.gameservice.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class GameController {

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public GameController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/connect/{gameId}")
    public void initialConnect(@DestinationVariable String gameId, @Header("name") String playerName) {
        Game game = gameService.initialConnect(UUID.fromString(gameId), playerName);
        if (game != null) {
            var gameStartedMessage = new GameStartedMessage();
            gameStartedMessage.setPayload(game);
            simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, gameStartedMessage);
        }
    }

    @MessageMapping("/move/{gameId}")
    @SendTo("/topic/state/{gameId}")
    public Message move(@DestinationVariable String gameId, @Payload PlayerMove playerMove, @Header("name") String name) {



        Game game = gameService.makeMove(UUID.fromString(gameId), playerMove, name);
        var playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        return playerMovedMessage;
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("simpSessionId") String sessionId) {
        AvailableMoves availableMoves = gameService.getAvailableMoves(UUID.fromString(gameId), position);

        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);

        var availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMoves);
        simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/personal/" + gameId, availableMovesMessage, headerAccessor.getMessageHeaders())
        ;
    }
}

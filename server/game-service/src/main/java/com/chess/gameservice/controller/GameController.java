package com.chess.gameservice.controller;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.AvailableMovesMessage;
import com.chess.gameservice.messages.GameErrorMessage;
import com.chess.gameservice.messages.GameStartedMessage;
import com.chess.gameservice.messages.PlayerMovedMessage;
import com.chess.gameservice.models.AvailableMoves;
import com.chess.gameservice.models.GameError;
import com.chess.gameservice.models.PlayerMove;
import com.chess.gameservice.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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
    public void makeMove(@DestinationVariable String gameId, @Payload PlayerMove playerMove, @Header("name") String name, @Header("simpSessionId") String sessionId) {
        try {
            Game game = gameService.makeMove(UUID.fromString(gameId), playerMove, name);
            var playerMovedMessage = new PlayerMovedMessage();
            playerMovedMessage.setPayload(game);
            simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);

        } catch (IllegalArgumentException e) {
            var headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
            headerAccessor.setSessionId(sessionId);

            var errorMessage = new GameErrorMessage();
            errorMessage.setPayload(new GameError(e.getMessage()));
            simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/personal/" + gameId, errorMessage, headerAccessor.getMessageHeaders());
        }
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("name") String name, @Header("simpSessionId") String sessionId) {
        var headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);

        try {
            AvailableMoves availableMoves = gameService.getAvailableMoves(UUID.fromString(gameId), position, name);
            var availableMovesMessage = new AvailableMovesMessage();
            availableMovesMessage.setPayload(availableMoves);
            simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/personal/" + gameId, availableMovesMessage, headerAccessor.getMessageHeaders());
        } catch (IllegalArgumentException e) {
            var errorMessage = new GameErrorMessage();
            errorMessage.setPayload(new GameError(e.getMessage()));
            simpMessagingTemplate.convertAndSendToUser(sessionId, "/queue/personal/" + gameId, errorMessage, headerAccessor.getMessageHeaders());
        }

    }
}

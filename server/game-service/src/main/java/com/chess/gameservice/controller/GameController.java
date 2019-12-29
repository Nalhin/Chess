package com.chess.gameservice.controller;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.exception.QueueException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.*;
import com.chess.gameservice.models.*;
import com.chess.gameservice.service.GameService;
import com.chess.gameservice.service.QueueService;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class GameController {

    private final GameService gameService;
    private final QueueService queueService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public GameController(GameService gameService, QueueService queueService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.queueService = queueService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/queue")
    public void joinQueue(@Header("name") String name, @Header("simpSessionId") String sessionId) throws QueueException {

        var users = queueService.joinQueue(User.builder().name(name).sessionId(sessionId).build());

        if (!users.isEmpty()) {
            var gameId = UUID.randomUUID();
            var gameFoundMessage = new GameFoundMessage();
            gameFoundMessage.setPayload(GameFound.builder().gameId(gameId.toString()).build());

            for (User user : users) {
                simpMessagingTemplate.convertAndSend("/queue/personal/" + user.getName(), gameFoundMessage);
            }
        }
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
    public void makeMove(@DestinationVariable String gameId, @Payload PlayerMove playerMove, @Header("name") String name, @Header("simpSessionId") String sessionId) throws GameException {
        Game game = gameService.makeMove(UUID.fromString(gameId), playerMove, name);
        var playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("name") String name) throws GameException {
        AvailableMoves availableMoves = gameService.getAvailableMoves(UUID.fromString(gameId), position, name);
        var availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMoves);
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, availableMovesMessage);
    }

    @MessageExceptionHandler
    public void handleCustomException(@Header("name") String name, @DestinationVariable String gameId, GameException ex) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setPayload(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, errorMessage);
    }

    @MessageExceptionHandler
    public void handleCustomException(@Header("name") String name, QueueException ex) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setPayload(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name, errorMessage);
    }
}

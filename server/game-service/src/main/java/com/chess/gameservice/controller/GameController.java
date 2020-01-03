package com.chess.gameservice.controller;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.events.PlayerOutOfTimeEvent;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.ErrorPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import com.chess.gameservice.messages.payloads.UserPromotionPayload;
import com.chess.gameservice.messages.socket.AvailableMovesMessage;
import com.chess.gameservice.messages.socket.ErrorMessage;
import com.chess.gameservice.messages.socket.GameStartedMessage;
import com.chess.gameservice.messages.socket.PlayerMovedMessage;
import com.chess.gameservice.service.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@AllArgsConstructor
public class GameController implements ApplicationListener<PlayerOutOfTimeEvent> {

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/connect/{gameId}")
    public void initialConnect(@DestinationVariable String gameId, @Header("name") String playerName) {
        Game game = gameService.initialConnect(UUID.fromString(gameId), playerName);
        if (game != null) {
            GameStartedMessage gameStartedMessage = new GameStartedMessage();
            gameStartedMessage.setPayload(game);
            simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, gameStartedMessage);
        }
    }

    @MessageMapping("/move/{gameId}")
    public void makeMove(@DestinationVariable String gameId, @Payload PlayerMovePayload playerMovePayload, @Header("name") String name, @Header("simpSessionId") String sessionId) throws GameException, JsonProcessingException {
        Game game = gameService.makeMove(UUID.fromString(gameId), playerMovePayload, name);
        var playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("name") String name) throws GameException {
        AvailableMovesPayload availableMovesPayload = gameService.getAvailableMoves(UUID.fromString(gameId), position, name);
        AvailableMovesMessage availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMovesPayload);
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, availableMovesMessage);
    }

    @MessageMapping("/promotion/{gameId}")
    public void pawnPromotion(@DestinationVariable String gameId, @Payload UserPromotionPayload userPromotionPayload, @Header("name") String name) throws GameException {
        Game game = gameService.makePromotion(UUID.fromString(gameId), userPromotionPayload.getPosition(), userPromotionPayload.getPieceType(), name);
        PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
    }

    @MessageExceptionHandler
    public void handleCustomException(@Header("name") String name, @DestinationVariable String gameId, GameException ex) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setPayload(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, errorMessage);
    }

    @Override
    public void onApplicationEvent(PlayerOutOfTimeEvent event) {
        UUID gameId = event.getGameId();
        String name= event.getName();
        Game game = gameService.playerOutOfTime(gameId);
        PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setPayload(new ErrorPayload("You run out of time!"));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, errorMessage);
    }
}

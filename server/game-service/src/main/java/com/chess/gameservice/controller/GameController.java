package com.chess.gameservice.controller;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.AvailableMovesMessage;
import com.chess.gameservice.messages.ErrorMessage;
import com.chess.gameservice.messages.GameStartedMessage;
import com.chess.gameservice.messages.PlayerMovedMessage;
import com.chess.gameservice.models.AvailableMoves;
import com.chess.gameservice.models.ErrorPayload;
import com.chess.gameservice.models.PlayerMove;
import com.chess.gameservice.models.UserPromotionPayload;
import com.chess.gameservice.service.GameService;
import com.chess.gameservice.service.KafkaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@AllArgsConstructor
public class GameController {

    private final KafkaService kafkaService;
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
    public void makeMove(@DestinationVariable String gameId, @Payload PlayerMove playerMove, @Header("name") String name, @Header("simpSessionId") String sessionId) throws GameException, JsonProcessingException {
        Game game = gameService.makeMove(UUID.fromString(gameId), playerMove, name);
        var playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        if(game.isOver()){
            kafkaService.sendHistory(game);
        }
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("name") String name) throws GameException {
        AvailableMoves availableMoves = gameService.getAvailableMoves(UUID.fromString(gameId), position, name);
        AvailableMovesMessage availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMoves);
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

}

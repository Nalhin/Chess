package com.chess.gameservice.controller;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.events.PlayerOutOfTimeEvent;
import com.chess.gameservice.messages.payloads.*;
import com.chess.gameservice.messages.rest.GamePresentMessage;
import com.chess.gameservice.messages.socket.*;
import com.chess.gameservice.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class GameController implements ApplicationListener<PlayerOutOfTimeEvent> {

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/connect/{gameId}")
    public void initialConnect(@DestinationVariable String gameId, @Header("name") String playerName) throws InterruptedException {
        Optional<Game> game = gameService.connect(UUID.fromString(gameId), playerName);
        if (game.isPresent()) {
            GameStartedMessage gameStartedMessage = new GameStartedMessage();
            gameStartedMessage.setPayload(game.get());
            simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, gameStartedMessage);
        }
    }

    @GetMapping("/game/is-game-present/{playerName}")
    public ResponseEntity<GamePresentMessage> isGamePresent(@PathVariable String playerName) {
        Optional<UUID> gameId = gameService.getGameWithUser(playerName);
        return gameId.map(uuid -> ResponseEntity.ok(new GamePresentMessage(uuid, true)))
                .orElseGet(() -> ResponseEntity.ok(new GamePresentMessage(null, false)));
    }

    @MessageMapping("/move/{gameId}")
    public void makeMove(@DestinationVariable String gameId, @Payload PlayerMovePayload playerMovePayload, @Header("name") String name) throws GameException {
        Game game = gameService.makeMove(UUID.fromString(gameId), playerMovePayload, name);
        PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        if (game.isWithAi()) {
            makeMoveAi(gameId);
        }
    }

    public void makeMoveAi(String gameId) throws GameException {
        Game game = gameService.aiMove(UUID.fromString(gameId));
        if (game != null) {
            PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
            playerMovedMessage.setPayload(game);
            simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        }
    }

    @MessageMapping("/forfeit/{gameId}")
    public void forfeit(@DestinationVariable String gameId, @Header("name") String name) throws GameException {
        Game game = gameService.forfeitGame(UUID.fromString(gameId), name);
        GameForfeitMessage gameForfeitMessage = new GameForfeitMessage();
        gameForfeitMessage.setPayload(GameForfeitPayload.builder().game(game).name(name).build());
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, gameForfeitMessage);
    }

    @MessageMapping("/available-moves/{gameId}")
    public void availableMoves(@DestinationVariable String gameId, @Payload Position position, @Header("name") String name) throws GameException {
        AvailableMovesPayload availableMovesPayload = gameService.getAvailableMoves(UUID.fromString(gameId), position, name);
        AvailableMovesMessage availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMovesPayload);
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, availableMovesMessage);

    }

    @MessageMapping("/promotion/{gameId}")
    public void pawnPromotion(@DestinationVariable String gameId, @Payload UserPromotionPayload userPromotionPayload, @Header("name") String name) throws GameException, IOException, ClassNotFoundException {
        Game game = gameService.makePromotion(UUID.fromString(gameId), userPromotionPayload.getPosition(), userPromotionPayload.getPieceType(), name);
        PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        if (game.isWithAi()) {
            makeMoveAi(gameId);
        }
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
        String name = event.getName();
        Game game = gameService.playerOutOfTime(gameId);
        PlayerMovedMessage playerMovedMessage = new PlayerMovedMessage();
        playerMovedMessage.setPayload(game);
        simpMessagingTemplate.convertAndSend("/topic/state/" + gameId, playerMovedMessage);
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setPayload(new ErrorPayload("You run out of time!"));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name + "/" + gameId, errorMessage);
    }
}

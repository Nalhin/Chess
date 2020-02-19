package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.GamePhase;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.events.GameOverEvent;
import com.chess.gameservice.messages.external.StartGameMessage;
import com.chess.gameservice.messages.external.User;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class GameServiceTest {

    GameService gameService;

    @Mock
    private ApplicationEventPublisher applicationEventPublisher;

    private final UUID gameId = new UUID(8, 8);
    private final String firstPlayerName = "firstPlayer";
    private final String secondPlayerName = "Computer";
    private StartGameMessage startGameMessage;


    @BeforeEach
    void setUp() {
        gameService = new GameService(applicationEventPublisher);
        startGameMessage = new StartGameMessage();
        User u1 = new User(firstPlayerName, "1");
        User u2 = new User(secondPlayerName, "2");
        ArrayList<User> users = new ArrayList<>();
        users.add(u1);
        users.add(u2);
        startGameMessage.setGameId(gameId);
        startGameMessage.setUsers(users);
    }

    @Test
    void forfeitGameTest() throws GameException {
        gameService.initGame(startGameMessage);

        Game game = gameService.forfeitGame(gameId, firstPlayerName);

        assertEquals(GamePhase.GAME_OVER, game.getGamePhase());
        assertEquals(PlayerColor.WHITE, game.getCurrentPlayerColor());
    }

    @Test
    void getGameWithUserTest() {
        gameService.initGame(startGameMessage);

        assertTrue(gameService.getGameWithUser(firstPlayerName).isPresent());
    }


    @Test
    void connectTest() throws InterruptedException {
        gameService.initGame(startGameMessage);

        Game game = gameService.connect(gameId, secondPlayerName).get();

        assertNotNull(game);
        assertNotNull(game.getPlayers().get(PlayerColor.BLACK));
        assertNotNull(game.getPlayers().get(PlayerColor.WHITE));
    }

    @Test
    void getAvailableMovesTest() throws GameException {
        gameService.initGame(startGameMessage);
        Position pawnPosition = new Position(6, 5);
        ArrayList<Position> expectedMoves = new ArrayList<>();
        expectedMoves.add(new Position(5, 5));
        expectedMoves.add(new Position(4, 5));
        AvailableMovesPayload expectedAvailableMoves = new AvailableMovesPayload();
        expectedAvailableMoves.setPosition(pawnPosition);
        expectedAvailableMoves.setAvailableMoves(expectedMoves);

        AvailableMovesPayload availableMoves = gameService.getAvailableMoves(gameId, pawnPosition, firstPlayerName);

        assertEquals(expectedAvailableMoves, availableMoves);
    }

    @Test
    void makeMoveTest() throws GameException, InterruptedException {
        gameService.initGame(startGameMessage);
        gameService.connect(gameId, firstPlayerName);
        gameService.connect(gameId, secondPlayerName);
        Position initialPosition = new Position(6, 7);
        Position destinationPosition = new Position(5, 7);
        PlayerMovePayload playerMove = new PlayerMovePayload(initialPosition, destinationPosition);

        Game gameAfterMove = gameService.makeMove(gameId, playerMove, firstPlayerName);

        assertTrue(gameAfterMove.getBoard().getState()[5][7] instanceof Pawn);
    }

    @Test
    void makePromotion() throws GameException {
        gameService.initGame(startGameMessage);
        makeMovesUntilPromotionIsAvailable();

        Game game = gameService.makePromotion(gameId, new Position(0, 7),
                PieceType.QUEEN,firstPlayerName);

        assertEquals(PlayerColor.BLACK,game.getCurrentPlayerColor());
    }

    @Test
    void playerOutOfTime() {
        gameService.initGame(startGameMessage);

        Game game = gameService.playerOutOfTime(gameId);

        assertEquals(GamePhase.GAME_OVER, game.getGamePhase());
    }

    @Test
    void makeAiMoveTest() throws GameException {
        gameService.initGame(startGameMessage);
        Position initialPosition = new Position(6, 7);
        Position destinationPosition = new Position(5, 7);
        PlayerMovePayload playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);

        Game game = gameService.makeAiMove(gameId);

        assertEquals(2, game.getCurrentTurn().getTurnNumber());
    }

    @Test
    void gameFinishedTest() {
        gameService.initGame(startGameMessage);

        gameService.gameFinished(gameId);

        verify(applicationEventPublisher, times(1))
                .publishEvent(Mockito.any(GameOverEvent.class));
        assertTrue(gameService.getGameWithUser(firstPlayerName).isEmpty());
    }


    void makeMovesUntilPromotionIsAvailable() throws GameException {
        Position initialPosition = new Position(6, 7);
        Position destinationPosition = new Position(4, 7);
        PlayerMovePayload playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);

        initialPosition = new Position(1, 5);
        destinationPosition = new Position(2, 5);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, secondPlayerName);

        initialPosition = new Position(4, 7);
        destinationPosition = new Position(3, 7);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);

        initialPosition = new Position(2, 5);
        destinationPosition = new Position(3, 5);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, secondPlayerName);

        initialPosition = new Position(3, 7);
        destinationPosition = new Position(2, 7);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);

        initialPosition = new Position(3, 5);
        destinationPosition = new Position(4, 5);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, secondPlayerName);

        initialPosition = new Position(2, 7);
        destinationPosition = new Position(1, 7);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);

        initialPosition = new Position(4, 5);
        destinationPosition = new Position(5, 5);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, secondPlayerName);

        initialPosition = new Position(1, 7);
        destinationPosition = new Position(0, 7);
        playerMove = new PlayerMovePayload(initialPosition, destinationPosition);
        gameService.makeMove(gameId, playerMove, firstPlayerName);
    }
}
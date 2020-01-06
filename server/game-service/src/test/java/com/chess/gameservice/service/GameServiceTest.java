package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.external.StartGameMessage;
import com.chess.gameservice.messages.external.User;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class GameServiceTest {

    GameService gameService;

    @Mock
    private ApplicationEventPublisher applicationEventPublisher;

    private UUID gameId = new UUID(8, 8);
    private String firstPlayerName = "firstPlayer";
    private String secondPlayerName = "secondPlayer";
    private StartGameMessage startGameMessage;



    @BeforeEach
    void setUp() {
        gameService = new GameService(applicationEventPublisher);
        startGameMessage= new StartGameMessage();
        User u1 = new User(firstPlayerName,"1");
        User u2 = new User(secondPlayerName,"2");
        ArrayList<User> users = new ArrayList<>();
        users.add(u1);
        users.add(u2);
        startGameMessage.setGameId(gameId);
        startGameMessage.setUsers(users);
    }

    @Test
    void getGameWithUserTest(){
        gameService.initGame(startGameMessage);

        assertTrue(gameService.getGameWithUser(firstPlayerName).isPresent());
    }


    @Test
    void initialConnectTest() throws InterruptedException {
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
    void moveTest() throws GameException, InterruptedException {
        gameService.initGame(startGameMessage);

        gameService.connect(gameId, firstPlayerName);
        gameService.connect(gameId, secondPlayerName);
        var initialPosition = new Position(6, 7);
        var destinationPosition = new Position(5, 7);
        var playerMove = new PlayerMovePayload(initialPosition, destinationPosition);

        var gameAfterMove = gameService.makeMove(gameId, playerMove, firstPlayerName);

        assertTrue(gameAfterMove.getBoard().getState()[5][7] instanceof Pawn);
    }
}
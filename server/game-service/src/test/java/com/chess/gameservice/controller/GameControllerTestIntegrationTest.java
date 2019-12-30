package com.chess.gameservice.controller;

import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.MessageTypes;
import com.chess.gameservice.models.PlayerMove;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Tag("integration-test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameControllerTestIntegrationTest {

    @LocalServerPort
    private int port;
    private String URL;
    private StompSession stompSession;
    private StompHeaders stompHeaders;
    private String gameId;

    private final String firstPlayerName = "firstPlayerName";
    private final String secondPlayerName = "secondPlayerName";

    private final String SUBSCRIBE_STATE_ENDPOINT = "/topic/state/";
    private final String SUBSCRIBE_PERSONAL_ENDPOINT = "/queue/personal/";

    private final String JOIN_QUEUE_ENDPOINT = "/app/queue";
    private final String CONNECT_TO_GAME_ENDPOINT = "/app/connect/";
    private final String MAKE_MOVE_ENDPOINT = "/app/move/";
    private final String AVAILABLE_MOVES_ENDPOINT = "/app/available-moves/";


    private LinkedBlockingDeque<JSONObject> blockingQueue;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() throws InterruptedException, ExecutionException, TimeoutException {
        stompHeaders = new StompHeaders();
        gameId = UUID.randomUUID().toString();
        blockingQueue = new LinkedBlockingDeque<>();
        URL = "ws://localhost:" + port + "/game";

        WebSocketStompClient stompClient = new WebSocketStompClient(
                new StandardWebSocketClient()
        );
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);

        objectMapper = new ObjectMapper();
    }

    void startGame() throws InterruptedException {
        stompHeaders.setDestination(CONNECT_TO_GAME_ENDPOINT + gameId);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        Thread.sleep(1000); //Ensure that first player connects first

        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, null);
    }

    @Test
    void joinQueue() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + secondPlayerName, new CreateStompFrameHandler());

        stompHeaders.setDestination(JOIN_QUEUE_ENDPOINT);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, null);

        JSONObject message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.GAME_FOUND.toString(), message.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void initialConnect() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_STATE_ENDPOINT +  gameId, new CreateStompFrameHandler());

        startGame();

        JSONObject message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.GAME_STARTED.toString(), message.get("type"));
        subscription.unsubscribe();
    }


    @Test
    void makeMove() throws InterruptedException, JSONException, JsonProcessingException {
        var subscription = stompSession.subscribe( SUBSCRIBE_STATE_ENDPOINT + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var playerMove = objectMapper.writeValueAsBytes(new PlayerMove(new Position(6, 0), new Position(5, 0)));
        stompHeaders.setDestination(MAKE_MOVE_ENDPOINT + gameId);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, playerMove);

        var message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.PLAYER_MOVED.toString(), message.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void makeMoveError() throws InterruptedException, JSONException, JsonProcessingException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName + "/" + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var playerMove = objectMapper.writeValueAsBytes(new PlayerMove(new Position(1, 0), new Position(2, 0)));
        stompHeaders.setDestination(MAKE_MOVE_ENDPOINT + gameId);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, playerMove);

        var message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.ERROR.toString(), message.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void availableMoves() throws InterruptedException, JsonProcessingException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName + "/" + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var move = objectMapper.writeValueAsBytes(new Position(6, 0));
        stompHeaders.setDestination(AVAILABLE_MOVES_ENDPOINT + gameId);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, move);

        var message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.AVAILABLE_MOVES.toString(), message.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void availableMovesError() throws InterruptedException, JsonProcessingException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + secondPlayerName + "/" + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var move = objectMapper.writeValueAsBytes(new Position(1, 0));
        stompHeaders.setDestination(AVAILABLE_MOVES_ENDPOINT + gameId);
        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, move);

        var message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.ERROR.toString(), message.get("type"));
        subscription.unsubscribe();
    }


    private class CreateStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return byte[].class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {

            try {
                blockingQueue.offer(new JSONObject(new String((byte[]) o)));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
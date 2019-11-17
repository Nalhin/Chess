package com.chess.gameservice.controller;

import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.MessageTypes;
import com.chess.gameservice.moves.PlayerMove;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameControllerTestIntegrationTest {

    @LocalServerPort
    private int port;
    private String URL;
    private StompSession stompSession;
    private StompHeaders stompHeaders;
    private String gameId;

    private final String SUBSCRIBE_STATE_ENDPOINT = "/topic/state/";
    private final String SUBSCRIBE_PERSONAL_ENDPOINT = "/user/queue/personal/";

    private final String CONNECT_TO_GAME_ENDPOINT = "/app/connect/";
    private final String MOVE_ENDPOINT = "/app/move/";
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
                new SockJsClient(Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient())))
        );
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);

        objectMapper = new ObjectMapper();
    }

    void startGame() {
        stompHeaders.setDestination(CONNECT_TO_GAME_ENDPOINT + gameId);
        stompHeaders.set("name", "test");
        stompSession.send(stompHeaders, null);

        stompHeaders.set("name", "test1");
        stompSession.send(stompHeaders, null);
    }

    @Test
    void initialConnect() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_STATE_ENDPOINT + gameId, new CreateStompFrameHandler());

        startGame();

        JSONObject message = blockingQueue.poll(10, SECONDS);
        assertEquals(MessageTypes.GAME_STARTED.toString(), message.get("type"));
        subscription.unsubscribe();
    }


    @Test
    void move() throws InterruptedException, JSONException, JsonProcessingException {
        var subscription = stompSession.subscribe(SUBSCRIBE_STATE_ENDPOINT + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var moves = objectMapper.writeValueAsBytes(new PlayerMove(new Position(6, 0), new Position(5, 0)));
        stompHeaders.setDestination(MOVE_ENDPOINT + gameId);
        stompHeaders.set("name", "test1");
        stompSession.send(stompHeaders, moves);

        var message = blockingQueue.poll(10, SECONDS);
        assertEquals(message.get("type"), MessageTypes.PLAYER_MOVED.toString());
        subscription.unsubscribe();
    }

    @Test
    void availableMoves() throws InterruptedException, JsonProcessingException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var move = objectMapper.writeValueAsBytes(new Position(1, 0));
        stompSession.send(AVAILABLE_MOVES_ENDPOINT + gameId, move);

        var message = blockingQueue.poll(10, SECONDS);
        assertEquals(message.get("type"), MessageTypes.AVAILABLE_MOVES.toString());
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
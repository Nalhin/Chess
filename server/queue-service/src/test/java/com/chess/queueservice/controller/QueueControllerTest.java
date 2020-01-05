package com.chess.queueservice.controller;

import com.chess.queueservice.messages.websocket.MessageTypes;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Tag("integration-test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@EmbeddedKafka(topics = "game-found",
        bootstrapServersProperty = "spring.kafka.bootstrap-servers")
@DirtiesContext
@SpringJUnitConfig
class QueueControllerTest {

    @LocalServerPort
    private int port;
    private String URL;
    private StompSession stompSession;
    private StompHeaders stompHeaders;

    private final String firstPlayerName = "firstPlayerName";
    private final String secondPlayerName = "secondPlayerName";

    private final String SUBSCRIBE_STATE_ENDPOINT = "/topic/state";
    private final String SUBSCRIBE_PERSONAL_ENDPOINT = "/queue/personal/";

    private final String JOIN_QUEUE_ENDPOINT = "/app/queue";


    private LinkedBlockingDeque<JSONObject> blockingQueue;


    @BeforeEach
    void setUp() throws InterruptedException, ExecutionException, TimeoutException {
        stompHeaders = new StompHeaders();
        blockingQueue = new LinkedBlockingDeque<>();
        URL = "ws://localhost:" + port + "/queue";

        WebSocketStompClient stompClient = new WebSocketStompClient(
                new StandardWebSocketClient()
        );
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);
    }

    @Test
    void joinQueueWaiting() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_STATE_ENDPOINT, new CreateStompFrameHandler());
        var personalSubscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName, new CreateStompFrameHandler());

        stompHeaders.setDestination(JOIN_QUEUE_ENDPOINT);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        JSONObject joinedMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(joinedMessage);
        assertEquals(MessageTypes.QUEUE_JOINED.toString(), joinedMessage.get("type"));

        JSONObject userCountMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(userCountMessage);
        assertEquals(MessageTypes.QUEUE_COUNT.toString(), userCountMessage.get("type"));

        stompHeaders.setDestination(JOIN_QUEUE_ENDPOINT);
        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, null);

        JSONObject gameFoundMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(gameFoundMessage);
        assertEquals(MessageTypes.QUEUE_GAME_FOUND.toString(), gameFoundMessage.get("type"));

        personalSubscription.unsubscribe();
        subscription.unsubscribe();
    }


    @Test
    void joinQueueGameFound() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + secondPlayerName, new CreateStompFrameHandler());

        stompHeaders.setDestination(JOIN_QUEUE_ENDPOINT);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, null);
        JSONObject message = blockingQueue.poll(10, SECONDS);
        assertNotNull(message);
        assertEquals(MessageTypes.QUEUE_GAME_FOUND.toString(), message.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void handleQueueException() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName, new CreateStompFrameHandler());
        var personalSubscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName, new CreateStompFrameHandler());

        stompHeaders.setDestination(JOIN_QUEUE_ENDPOINT);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        blockingQueue.poll(10, SECONDS);
        JSONObject joinedMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(joinedMessage);
        assertEquals(MessageTypes.QUEUE_JOINED.toString(), joinedMessage.get("type"));

        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, null);

        JSONObject errorMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(errorMessage);
        assertEquals(MessageTypes.QUEUE_ERROR.toString(), errorMessage.get("type"));
        personalSubscription.unsubscribe();
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
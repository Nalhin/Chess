package com.chess.chatservice.component;

import com.chess.chatservice.models.MessageTypes;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Tag("integration-test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatEventListenerTest {

    @LocalServerPort
    private int port;
    private String URL;
    private StompSession stompSession;
    private StompHeaders stompHeaders;
    private String chatId;

    private final String SUBSCRIBE_CHAT_ENDPOINT = "/topic/chat/";
    private final String SEND_MESSAGE_ENDPOINT = "/app/chat/";

    private LinkedBlockingDeque<JSONObject> blockingQueue;

    private ObjectMapper objectMapper;

    private final String playerName = "playerName";


    @BeforeEach
    void setUp() throws InterruptedException, ExecutionException, TimeoutException {
        stompHeaders = new StompHeaders();
        chatId = UUID.randomUUID().toString();
        blockingQueue = new LinkedBlockingDeque<>();
        URL = "ws://localhost:" + port + "/chat";

        WebSocketStompClient stompClient = new WebSocketStompClient(
                new SockJsClient(Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient())))
        );
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);

        objectMapper = new ObjectMapper();
    }

    @Test
    void sessionSubscribeEvent() throws InterruptedException, JSONException {
        var subscription = stompSession.subscribe(SUBSCRIBE_CHAT_ENDPOINT + chatId, new ChatEventListenerTest.CreateStompFrameHandler());

        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(receivedMessage);
        assertEquals(MessageTypes.INFO_MESSAGE.toString(), receivedMessage.get("type"));

        subscription.unsubscribe();
    }

    @Test
    void sessionUnsubscribeEvent() throws InterruptedException, JSONException {
        var firstSubscription = stompSession.subscribe(SUBSCRIBE_CHAT_ENDPOINT + chatId, new ChatEventListenerTest.CreateStompFrameHandler());
        blockingQueue.poll(10, SECONDS);
        var secondSubscription = stompSession.subscribe(SUBSCRIBE_CHAT_ENDPOINT + chatId, new ChatEventListenerTest.CreateStompFrameHandler());
        blockingQueue.poll(10, SECONDS);

        firstSubscription.unsubscribe();
        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);

        assertNotNull(receivedMessage);
        assertEquals(MessageTypes.INFO_MESSAGE.toString(), receivedMessage.get("type"));
        secondSubscription.unsubscribe();
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
package com.chess.chatservice.controller;

import com.chess.chatservice.messages.MessageTypes;
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
import org.springframework.messaging.simp.stomp.StompSession.Subscription;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.*;


@Tag("integration-test")
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatControllerTest {

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

    private final String userLogin = "playerLogin";


    @BeforeEach
    void setUp() throws InterruptedException, ExecutionException, TimeoutException {
        chatId = UUID.randomUUID().toString();
        stompHeaders = new StompHeaders();
        stompHeaders.setDestination(SUBSCRIBE_CHAT_ENDPOINT + chatId);
        stompHeaders.set("login", userLogin);
        blockingQueue = new LinkedBlockingDeque<>();
        URL = "ws://localhost:" + port + "/chat";

        WebSocketStompClient stompClient = new WebSocketStompClient(
                new StandardWebSocketClient()
        );
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);

        objectMapper = new ObjectMapper();
    }

    @Test
    void sendMessage() throws InterruptedException, JsonProcessingException, JSONException {
        Subscription subscription = stompSession.subscribe(stompHeaders, new CreateStompFrameHandler());
        blockingQueue.poll(10, SECONDS);

        byte[] messageContent = objectMapper.writeValueAsBytes("message content");
        stompHeaders.setDestination(SEND_MESSAGE_ENDPOINT + chatId);
        stompHeaders.set("login", userLogin);
        stompSession.send(stompHeaders, messageContent);

        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(receivedMessage);
        assertEquals(MessageTypes.CHAT_MESSAGE.toString(), receivedMessage.get("type"));

        subscription.unsubscribe();
    }


    @Test
    void sessionSubscribeEvent() throws InterruptedException, JSONException {
        Subscription subscription = stompSession.subscribe(stompHeaders, new CreateStompFrameHandler());

        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);
        assertNotNull(receivedMessage);
        assertEquals(MessageTypes.INFO_MESSAGE.toString(), receivedMessage.get("type"));

        subscription.unsubscribe();
    }

    @Test
    void sessionUnsubscribeEvent() throws InterruptedException, JSONException {
        Subscription firstUserSubscription = stompSession.subscribe(stompHeaders, new CreateStompFrameHandler());
        blockingQueue.poll(10, SECONDS);
        stompHeaders = new StompHeaders();
        stompHeaders.setDestination(SUBSCRIBE_CHAT_ENDPOINT + chatId);
        stompHeaders.set("login", "login");
        Subscription secondSubscription = stompSession.subscribe(stompHeaders, new CreateStompFrameHandler());
        blockingQueue.poll(10, SECONDS);
        blockingQueue.poll(10, SECONDS);

        firstUserSubscription.unsubscribe();
        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);

        assertNotNull(receivedMessage);
        assertEquals(MessageTypes.INFO_MESSAGE.toString(), receivedMessage.get("type"));
        assertTrue(receivedMessage.get("content").toString().contains(userLogin));
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
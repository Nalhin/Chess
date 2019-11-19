package com.chess.chatservice.controllers;

import org.junit.jupiter.api.Tag;
import org.springframework.boot.test.context.SpringBootTest;

@Tag("integration-test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatControllerTest {
//
//    @LocalServerPort
//    private int port;
//    private String URL;
//    private StompSession stompSession;
//    private StompHeaders stompHeaders;
//    private String chatId;
//
//    private final String SUBSCRIBE_CHAT_ENDPOINT = "/topic/chat/";
//    private final String SEND_MESSAGE_ENDPOINT = "/app/chat/";
//
//    private LinkedBlockingDeque<JSONObject> blockingQueue;
//
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() throws InterruptedException, ExecutionException, TimeoutException {
//        stompHeaders = new StompHeaders();
//        chatId = UUID.randomUUID().toString();
//        blockingQueue = new LinkedBlockingDeque<>();
//        URL = "ws://localhost:" + port + "/chat";
//
//        WebSocketStompClient stompClient = new WebSocketStompClient(
//                new SockJsClient(Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient())))
//        );
//        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
//        }).get(1, SECONDS);
//
//        objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    void sendMessage() throws InterruptedException, JsonProcessingException {
//        var subscription = stompSession.subscribe(SUBSCRIBE_CHAT_ENDPOINT + chatId, new CreateStompFrameHandler());
//
//        var message = new Message("ac", "ac");
//        var playerMessage = objectMapper.writeValueAsBytes(message);
//        stompHeaders.setDestination(SEND_MESSAGE_ENDPOINT + chatId);
//        stompSession.send(stompHeaders, playerMessage);
//
//        JSONObject receivedMessage = blockingQueue.poll(10, SECONDS);
//        assertNotNull(receivedMessage);
//        subscription.unsubscribe();
//    }
//
//    private class CreateStompFrameHandler implements StompFrameHandler {
//        @Override
//        public Type getPayloadType(StompHeaders stompHeaders) {
//            return byte[].class;
//        }
//
//        @Override
//        public void handleFrame(StompHeaders stompHeaders, Object o) {
//
//            try {
//                blockingQueue.offer(new JSONObject(new String((byte[]) o)));
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }
//        }
//    }
}
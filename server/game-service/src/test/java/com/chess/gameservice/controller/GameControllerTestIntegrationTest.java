package com.chess.gameservice.controller;

import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.external.StartGameMessage;
import com.chess.gameservice.messages.external.User;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import com.chess.gameservice.messages.socket.MessageTypes;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.kafka.test.EmbeddedKafkaBroker;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Tag("integration-test")
@EmbeddedKafka(topics = "start-game")
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameControllerTestIntegrationTest {


    @Autowired
    private KafkaTemplate<String, StartGameMessage> template;


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

        template.setDefaultTopic("start-game");
        User u1 = new User(firstPlayerName,"1");
        User u2 = new User(secondPlayerName,"2");
        ArrayList<User> users = new ArrayList<>();
        users.add(u1);
        users.add(u2);
        Message<StartGameMessage> message= MessageBuilder
                .withPayload(new StartGameMessage(UUID.fromString(gameId),users))
                .setHeader(KafkaHeaders.TOPIC,"start-game").build();
        template.send(message);
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

        var playerMove = objectMapper.writeValueAsBytes(new PlayerMovePayload(new Position(6, 0), new Position(5, 0)));
        stompHeaders.setDestination(MAKE_MOVE_ENDPOINT + gameId);
        stompHeaders.set("name", firstPlayerName);
        stompSession.send(stompHeaders, playerMove);

        var message = blockingQueue.poll(10, SECONDS);

        var secondPlayerMove = objectMapper.writeValueAsBytes(new PlayerMovePayload(new Position(1, 0), new Position(2, 0)));
        stompHeaders.setDestination(MAKE_MOVE_ENDPOINT + gameId);
        stompHeaders.set("name", secondPlayerName);
        stompSession.send(stompHeaders, secondPlayerMove );

        var secondPlayerMessage= blockingQueue.poll(10, SECONDS);

        assertNotNull(message);
        assertEquals(MessageTypes.PLAYER_MOVED.toString(), secondPlayerMessage.get("type"));
        subscription.unsubscribe();
    }

    @Test
    void makeMoveError() throws InterruptedException, JSONException, JsonProcessingException {
        var subscription = stompSession.subscribe(SUBSCRIBE_PERSONAL_ENDPOINT + firstPlayerName + "/" + gameId, new CreateStompFrameHandler());

        startGame();
        blockingQueue.poll(10, SECONDS);

        var playerMove = objectMapper.writeValueAsBytes(new PlayerMovePayload(new Position(1, 0), new Position(2, 0)));
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

    @TestConfiguration
    public static class TestConfig{

        @Value("${spring.kafka.bootstrap-servers}")
        private String bootstrapServers;


        @Bean
        public Map<String, Object> kafkaTestConfig() {
            Map<String, Object> props = new HashMap<>();
            props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
            props.put(ProducerConfig.RETRIES_CONFIG, 0);
            props.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
            props.put(ProducerConfig.LINGER_MS_CONFIG, 1);
            props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);
            props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
            props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
            return props;

        }

        @Bean
        public ProducerFactory<String, StartGameMessage> producerTestFactory() {
            return new DefaultKafkaProducerFactory<>(kafkaTestConfig());
        }

        @Bean
        public KafkaTemplate<String, StartGameMessage> kafkaTestTemplate() {
            return new KafkaTemplate<>(producerTestFactory());
        }
    }


    static {
        System.setProperty(EmbeddedKafkaBroker.BROKER_LIST_PROPERTY,
                "spring.kafka.bootstrap-servers");
    }
}
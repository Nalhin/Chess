package com.chess.gameservice.websocket;


import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.models.AvailableMoves;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WebSocketTest {

    @LocalServerPort
    private int port;
    private String URL;
    private StompSession stompSession;

    private static final String SUBSCRIBE_CREATE_BOARD_ENDPOINT = "/topic/board/";
    private static final String SEND_CREATE_BOARD_ENDPOINT = "/app/create/";
    private static final String SUBSCRIBE_MOVE_ENDPOINT = "/topic/move/";
    private static final String SEND_MOVE_ENDPOINT = "/app/move/";
    private static final String SUBSCRIBE_AVAILABLE_MOVES_ENDPOINT = "/topic/available-moves/";
    private static final String SEND_AVAILABLE_MOVES_ENDPOINT = "/app/available-moves/";


    private CompletableFuture<Board> completableFutureBoard;
    private CompletableFuture<Board> completableFutureMove;
    private CompletableFuture<AvailableMoves> completableFutureAvailableMoves;


    @BeforeEach
    void setup() throws InterruptedException, ExecutionException, TimeoutException {
        completableFutureBoard = new CompletableFuture<>();
        completableFutureAvailableMoves = new CompletableFuture<>();
        completableFutureMove = new CompletableFuture<>();
        URL = "ws://localhost:" + port + "/game";

        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
        stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
        }).get(1, SECONDS);
    }

    @Test
    void testCreateGameEndpoint() throws InterruptedException, ExecutionException, TimeoutException {
        String uuid = UUID.randomUUID().toString();

        stompSession.subscribe(SUBSCRIBE_CREATE_BOARD_ENDPOINT + uuid, new CreateGameStompFrameHandler());
        stompSession.send(SEND_CREATE_BOARD_ENDPOINT + uuid, null);

        Board board = completableFutureBoard.get(10, SECONDS);
        assertNotNull(board);
    }

    @Test
    void testMoveEndpoint() throws InterruptedException, ExecutionException, TimeoutException {
        String uuid = UUID.randomUUID().toString();
        stompSession.subscribe(SUBSCRIBE_CREATE_BOARD_ENDPOINT + uuid, new CreateGameStompFrameHandler());
        stompSession.send(SEND_CREATE_BOARD_ENDPOINT + uuid, null);
        completableFutureBoard.get(10, SECONDS);

        stompSession.subscribe(SUBSCRIBE_MOVE_ENDPOINT + uuid, new CreateMoveStompFrameHandler());
        stompSession.send(SEND_MOVE_ENDPOINT + uuid + "/1#0/3#0", null);
        Board boardAfterMove = completableFutureMove.get(10, SECONDS);

        assertNotNull(boardAfterMove);
    }

    @Test
    void testAvailableMovesEndpoint() throws InterruptedException, ExecutionException, TimeoutException {
        String uuid = UUID.randomUUID().toString();
        stompSession.subscribe(SUBSCRIBE_CREATE_BOARD_ENDPOINT + uuid, new CreateGameStompFrameHandler());
        stompSession.send(SEND_CREATE_BOARD_ENDPOINT + uuid, null);
        completableFutureBoard.get(10, SECONDS);

        stompSession.subscribe(SUBSCRIBE_AVAILABLE_MOVES_ENDPOINT + uuid, new CreateAvailableMovesStompFrameHandler());
        stompSession.send(SEND_AVAILABLE_MOVES_ENDPOINT + uuid + "/1#0", null);

        AvailableMoves position = completableFutureAvailableMoves.get(10, SECONDS);
        assertNotNull(position);
    }


    private List<Transport> createTransportClient() {
        List<Transport> transports = new ArrayList<>(1);
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));
        return transports;
    }


    private class CreateGameStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return Board.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            completableFutureBoard.complete((Board) o);
        }
    }

    private class CreateMoveStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return Board.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            completableFutureMove.complete((Board) o);
        }
    }

    private class CreateAvailableMovesStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return AvailableMoves.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            completableFutureAvailableMoves.complete((AvailableMoves) o);
        }
    }
}

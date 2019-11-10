package com.chess.gameservice.websocket;

import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;

@Getter
@Setter
public class CreateStompFrameHandler<T> implements StompFrameHandler {
    private CompletableFuture<T> completableFuture;
    final Class<T> typeClass;

    public CreateStompFrameHandler(Class<T> typeClass, CompletableFuture<T> completableFuture) {
        this.typeClass = typeClass;
        this.completableFuture = completableFuture;
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {
        return Class.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        completableFuture.complete(typeClass.cast(payload));
    }
}
//    var stompFrameHandler = new CreateStompFrameHandler<>(Board.class, completableFutureBoard);

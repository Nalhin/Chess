package com.chess.queueservice.controller;

import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.messages.websocket.CountMessage;
import com.chess.queueservice.messages.websocket.ErrorMessage;
import com.chess.queueservice.messages.websocket.GameFoundMessage;
import com.chess.queueservice.messages.websocket.QueueJoinedMessage;
import com.chess.queueservice.messages.websocket.payload.CountPayload;
import com.chess.queueservice.messages.websocket.payload.ErrorPayload;
import com.chess.queueservice.messages.websocket.payload.GameFoundPayload;
import com.chess.queueservice.messages.websocket.payload.QueueJoinedMessagePayload;
import com.chess.queueservice.models.User;
import com.chess.queueservice.service.KafkaService;
import com.chess.queueservice.service.QueueService;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.UUID;

@AllArgsConstructor
@Controller
public class QueueController {
    private final QueueService queueService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final KafkaService kafkaService;

    @MessageMapping("/queue")
    public void joinQueue(SimpMessageHeaderAccessor headerAccessor, @Header("name") String name) throws QueueException {
        ArrayList<User> users = queueService.joinQueue(new User(name,headerAccessor.getSessionId()));
        if (users != null) {
            UUID gameId = UUID.randomUUID();
            GameFoundMessage gameFoundMessage = new GameFoundMessage(new GameFoundPayload(gameId.toString()));
            kafkaService.sendGameFound(gameId,users);
            for (User user : users) {
                simpMessagingTemplate.convertAndSend("/queue/personal/" + user.getName(), gameFoundMessage);
            }
        } else {
            int queueSize = queueService.getQueueSize();
            String date = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mmX")
                    .withZone(ZoneOffset.UTC)
                    .format(Instant.now());

            QueueJoinedMessage queueJoinedMessage = new QueueJoinedMessage(new QueueJoinedMessagePayload( date));
            simpMessagingTemplate.convertAndSend("/queue/personal/" + name, queueJoinedMessage);

            CountMessage userCountMessage = new CountMessage(new CountPayload(queueSize));
            simpMessagingTemplate.convertAndSend("/topic/state", userCountMessage);
        }
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event){
        queueService.removeUser(event.getSessionId());
    }

    @MessageExceptionHandler
    public void handleQueueException(@Header("name") String name, QueueException ex) {
        ErrorMessage errorMessage = new ErrorMessage(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name, errorMessage);
    }
}

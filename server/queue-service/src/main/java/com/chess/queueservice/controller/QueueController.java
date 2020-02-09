package com.chess.queueservice.controller;

import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.messages.websocket.*;
import com.chess.queueservice.messages.websocket.payload.*;
import com.chess.queueservice.models.User;
import com.chess.queueservice.service.KafkaService;
import com.chess.queueservice.service.QueueService;
import com.chess.queueservice.utils.IsoDate;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.UUID;

@AllArgsConstructor
@Controller
public class QueueController {
    private final QueueService queueService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final KafkaService kafkaService;

    //TODO REFACTOR
    @MessageMapping("/queue")
    public void joinQueue(SimpMessageHeaderAccessor headerAccessor, @Header("name") String name) throws QueueException {
        ArrayList<User> users = queueService.joinQueue(new User(name, headerAccessor.getSessionId()));
        if (users != null) {
            UUID gameId = UUID.randomUUID();
            GameFoundMessage gameFoundMessage = new GameFoundMessage(new GameFoundPayload(gameId.toString()));
            kafkaService.sendGameFound(gameId, users,false);
            for (User user : users) {
                simpMessagingTemplate.convertAndSend("/queue/personal/" + user.getName(), gameFoundMessage);
            }
        } else {
            int queueSize = queueService.getQueueSize();
            QueueJoinedMessage queueJoinedMessage = new QueueJoinedMessage(new QueueJoinedMessagePayload(IsoDate.getCurrentIsoDate()));
            simpMessagingTemplate.convertAndSend("/queue/personal/" + name, queueJoinedMessage);

            CountMessage userCountMessage = new CountMessage(new CountPayload(queueSize));
            simpMessagingTemplate.convertAndSend("/topic/state", userCountMessage);
        }
    }

    @MessageMapping("/leave-queue")
    public void leaveQueue(@Header("name") String name,@Header("simpSessionId") String sessionId){
        queueService.removeUser(sessionId);
        QueueLeftMessage message = new QueueLeftMessage( new QueueLeftPayload(name));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name, message );
    };

    @PostMapping(value = "/queue/with-ai")
    public ResponseEntity<GameFoundMessage> playWithAi(@RequestBody User user) {
        UUID gameId = UUID.randomUUID();
        GameFoundMessage gameFoundMessage = new GameFoundMessage(new GameFoundPayload(gameId.toString()));
        ArrayList<User> users = new ArrayList<>();
        users.add(user);
        users.add(new User("Computer","Computer"));
        kafkaService.sendGameFound(gameId, users,true);
        return ResponseEntity.ok(gameFoundMessage);
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        queueService.removeUser(event.getSessionId());
    }

    @MessageExceptionHandler
    public void handleQueueException(@Header("name") String name, QueueException ex) {
        ErrorMessage errorMessage = new ErrorMessage(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name, errorMessage);
    }
}

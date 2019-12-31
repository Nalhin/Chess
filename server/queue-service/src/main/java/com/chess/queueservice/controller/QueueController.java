package com.chess.queueservice.controller;

import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.messages.CountMessage;
import com.chess.queueservice.messages.ErrorMessage;
import com.chess.queueservice.messages.GameFoundMessage;
import com.chess.queueservice.messages.QueueJoinedMessage;
import com.chess.queueservice.messages.payloads.CountPayload;
import com.chess.queueservice.messages.payloads.ErrorPayload;
import com.chess.queueservice.messages.payloads.GameFoundPayload;
import com.chess.queueservice.messages.payloads.QueueJoinedMessagePayload;
import com.chess.queueservice.models.User;
import com.chess.queueservice.service.QueueService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

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


    @MessageMapping("/queue")
    public void joinQueue(@Header("name") String name) throws QueueException {

        ArrayList<User> users = queueService.joinQueue(new User(name));

        if (users != null) {
            UUID gameId = UUID.randomUUID();
            GameFoundMessage gameFoundMessage = new GameFoundMessage(new GameFoundPayload(gameId.toString()));

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

    @MessageExceptionHandler
    public void handleQueueException(@Header("name") String name, QueueException ex) {
        ErrorMessage errorMessage = new ErrorMessage(new ErrorPayload(ex.getMessage()));
        simpMessagingTemplate.convertAndSend("/queue/personal/" + name, errorMessage);
    }
}

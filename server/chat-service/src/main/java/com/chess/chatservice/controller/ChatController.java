package com.chess.chatservice.controller;

import com.chess.chatservice.model.ChatMessage;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Controller
public class ChatController {

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage sendMessage(@DestinationVariable String chatId, @Payload String messageContent, @Header("login") String login) {

        var message = new ChatMessage();
        message.setName(login);
        message.setContent(messageContent);
        message.setId(UUID.randomUUID().toString());
        message.setSendDate(new SimpleDateFormat("HH:mm:ss").format(new Date()));
        return message;
    }
}

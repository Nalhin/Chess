package com.chess.chatservice.controller;

import com.chess.chatservice.model.ChatMessage;
import com.chess.chatservice.utils.IsoDate;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;

@Controller
public class ChatController {

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage sendMessage(@DestinationVariable String chatId, @Payload String messageContent, @Header("login") String login) {

        var message = new ChatMessage();
        message.setSender(login);
        message.setContent(messageContent);
        message.setId(UUID.randomUUID().toString());
        message.setSendDate(IsoDate.getCurrentIsoDate());
        return message;
    }
}

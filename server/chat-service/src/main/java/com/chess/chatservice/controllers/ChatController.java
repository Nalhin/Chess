package com.chess.chatservice.controllers;

import com.chess.chatservice.models.Message;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class ChatController {

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public Message sendMessage(@DestinationVariable String chatId, @Payload String messageContent, @Header("name") String name) {

        var message = new Message(messageContent, name, new SimpleDateFormat("HH:mm:ss").format(new Date()));
        return message;
    }

}

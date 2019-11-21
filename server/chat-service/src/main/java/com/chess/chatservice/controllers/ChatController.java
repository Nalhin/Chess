package com.chess.chatservice.controllers;

import com.chess.chatservice.models.Message;
import com.chess.chatservice.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public Message sendMessage(@DestinationVariable String chatId, @Payload String messageContent, @Header("name") String name) {

        var message = new Message(messageContent, name, new Date());

        return message;
    }

}

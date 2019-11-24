package com.chess.chatservice.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
public class ChatService {
    private HashMap<String, UUID> playerChat = new HashMap<>();

    public void setChatId(String playerSessionId, UUID chatId) {
        playerChat.put(playerSessionId, chatId);
    }

    public UUID getChatIdAndRemoveFromChat(String playerSessionId) {
        var chatId = playerChat.get(playerSessionId);
        playerChat.remove(playerSessionId);
        return chatId;
    }

}

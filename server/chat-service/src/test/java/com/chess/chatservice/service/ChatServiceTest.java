package com.chess.chatservice.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ChatServiceTest {

    private ChatService chatService;
    private final String sessionId = "123";
    private UUID uuid;

    @BeforeEach
    void setUp() {
        chatService = new ChatService();
        uuid = UUID.randomUUID();
    }

    @Test
    void setChatId() {
        chatService.setChatId(sessionId, uuid);

        assertEquals(chatService.getChatIdAndRemoveFromChat(sessionId), uuid);
    }

    @Test
    void getChatIdAndRemoveFromChat() {
        chatService.setChatId(sessionId, uuid);
        chatService.getChatIdAndRemoveFromChat(sessionId);

        assertNull(chatService.getChatIdAndRemoveFromChat(sessionId));
    }
}
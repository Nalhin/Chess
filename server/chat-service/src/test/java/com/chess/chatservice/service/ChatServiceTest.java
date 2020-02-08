package com.chess.chatservice.service;

import com.chess.chatservice.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ChatServiceTest {

    private ChatService chatService;
    private final String sessionId = "123";
    private UUID chatId;
    private String userLogin = "login";

    @BeforeEach
    void setUp() {
        chatService = new ChatService();
        chatId = UUID.randomUUID();
    }

    @Test
    void setChatId() {
        User user = new User(userLogin, chatId);
        chatService.addUser(sessionId, user);

        assertEquals(chatService.getChatIdAndRemoveUser(sessionId).getChatId(), chatId);
    }

    @Test
    void getChatIdAndRemoveFromChat() {
        User user = new User(userLogin, chatId);

        chatService.addUser(sessionId, user);
        chatService.getChatIdAndRemoveUser(sessionId);

        assertNull(chatService.getChatIdAndRemoveUser(sessionId));
    }
}
package com.chess.chatservice.controller;

import com.chess.chatservice.messages.ChatMessage;
import com.chess.chatservice.messages.InfoMessage;
import com.chess.chatservice.model.User;
import com.chess.chatservice.service.ChatService;
import com.chess.chatservice.utils.IsoDate;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.UUID;

@Controller
@AllArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    private String parseAddress(String address) {
        return address.substring(address.lastIndexOf('/') + 1);
    }

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage sendMessage(@DestinationVariable String chatId, @Payload String messageContent, @Header("login") String login) {
        ChatMessage message = new ChatMessage();
        message.setSender(login);
        message.setContent(messageContent);
        message.setId(UUID.randomUUID().toString());
        message.setSendDate(IsoDate.getCurrentIsoDate());
        return message;
    }

    @EventListener
    public void sessionSubscribeEvent(SessionSubscribeEvent subscribeEvent) throws InterruptedException {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(subscribeEvent.getMessage());
        @SuppressWarnings("unchecked") final MultiValueMap<String, String> nativeHeaders = (MultiValueMap<String, String>) accessor.getHeader(StompHeaderAccessor.NATIVE_HEADERS);
        String login = nativeHeaders != null ? nativeHeaders.get("login").get(0) : "User";
        String address = accessor.getDestination();

        if (address != null) {
            String chatId = parseAddress(address);
            chatService.addUser(accessor.getSubscriptionId(), new User(login, UUID.fromString(chatId)));
            sendInfoMessage(chatId, login + " connected.", login);
        }
    }

    @EventListener
    public void sessionUnsubscribeEvent(SessionUnsubscribeEvent unsubscribeEvent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(unsubscribeEvent.getMessage());
        sendDisconnectMessage(accessor);
    }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent disconnectEvent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        sendDisconnectMessage(accessor);
    }

    private void sendDisconnectMessage(StompHeaderAccessor accessor) {
        User user = chatService.getChatIdAndRemoveUser(accessor.getSubscriptionId());
        if (user != null) {
            sendInfoMessage(user.getChatId().toString(), user.getLogin() + " disconnected.", user.getLogin());
        }
    }

    private void sendInfoMessage(String chatId, String content, String sender) {
        InfoMessage message = new InfoMessage();
        message.setSender(sender);
        message.setContent(content);
        message.setSendDate(IsoDate.getCurrentIsoDate());
        message.setId(UUID.randomUUID().toString());
        messagingTemplate.convertAndSend("/topic/chat/" + chatId, message);
    }


}

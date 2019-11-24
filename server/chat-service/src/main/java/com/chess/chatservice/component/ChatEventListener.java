package com.chess.chatservice.component;

import com.chess.chatservice.models.InfoMessage;
import com.chess.chatservice.service.ChatService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Component
public class ChatEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatEventListener(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    private String parseAddress(String address) {
        return address.substring(address.lastIndexOf('/') + 1);
    }

    @EventListener
    public void sessionSubscribeEvent(SessionSubscribeEvent subscribeEvent) {
        var accessor = StompHeaderAccessor.wrap(subscribeEvent.getMessage());
        var address = accessor.getDestination();
        if (address != null) {
            var chatId = parseAddress(address);
            chatService.setChatId(accessor.getSubscriptionId(), UUID.fromString(chatId));
            sendInfoMessage(chatId, "User connected.");
        }
    }

    @EventListener
    public void sessionUnsubscribeEvent(SessionUnsubscribeEvent unsubscribeEvent) {
        var accessor = StompHeaderAccessor.wrap(unsubscribeEvent.getMessage());
        var chatId = chatService.getChatIdAndRemoveFromChat(accessor.getSubscriptionId());
        sendInfoMessage(chatId.toString(), "User left the chat.");
    }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent disconnectEvent) {
        var accessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        var chatId = chatService.getChatIdAndRemoveFromChat(accessor.getSubscriptionId());
        sendInfoMessage(chatId.toString(), "User disconnected.");
    }

    private void sendInfoMessage(String chatId, String content) {
        var message = new InfoMessage();
        message.setContent(content);
        message.setSendDate(new SimpleDateFormat("HH:mm:ss").format(new Date()));
        message.setId(UUID.randomUUID().toString());
        messagingTemplate.convertAndSend("/topic/chat/" + chatId, message);
    }
}

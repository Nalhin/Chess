package com.chess.chatservice.model;


import lombok.Data;

@Data
abstract class Message {
    String content;
    String sendDate;
    MessageTypes type;
    String id;
}

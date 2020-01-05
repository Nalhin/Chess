package com.chess.gameservice.messages.external;

import lombok.*;

import java.util.ArrayList;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StartGameMessage {
    UUID gameId;
    ArrayList<User> users;
}

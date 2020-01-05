package com.chess.gameservice.messages.rest;

import com.chess.gameservice.game.Game;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReconnectMessage {
    private Game game;
}

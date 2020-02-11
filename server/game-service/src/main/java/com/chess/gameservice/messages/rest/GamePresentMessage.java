package com.chess.gameservice.messages.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GamePresentMessage {
    private UUID gameId;
    @JsonProperty("isPresent")
    private boolean isPresent;
}

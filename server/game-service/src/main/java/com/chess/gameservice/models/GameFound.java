package com.chess.gameservice.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameFound {
    private String gameId;
}
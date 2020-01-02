package com.chess.gameservice.messages.payloads;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ErrorPayload {
    private String error;

    public ErrorPayload(String error) {
        this.error = error;
    }
}

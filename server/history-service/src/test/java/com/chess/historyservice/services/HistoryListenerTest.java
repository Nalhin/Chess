package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.models.external.*;
import com.chess.historyservice.repositories.HistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.isA;

@ExtendWith(MockitoExtension.class)
class HistoryListenerTest {

    @Mock
    private HistoryRepository historyRepository;

    @InjectMocks
    private HistoryListener historyListener;

    private HistoryMessage historyMessage;

    @BeforeEach
    void setUp() {
        GameTurn gameTurn = GameTurn.builder()
                .initialPosition(new Position(1, 1))
                .destinationPosition(new Position(2, 2))
                .pieceType(PieceType.BISHOP)
                .playerColor(PlayerColor.BLACK)
                .build();

        ArrayList<GameTurn> turns = new ArrayList();
        turns.add(gameTurn);
        turns.add(gameTurn);
        historyMessage= HistoryMessage.builder().blackPlayer("a")
                .gameTurns(turns)
                .whitePlayer("1")
                .winner("1").build();
    }

    @Test
    void receiveGameData(){

        historyListener.receiveGameData(historyMessage);

        Mockito.verify(historyRepository, Mockito.times(1)).save(isA(Game.class));
    }
}
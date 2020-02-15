package com.chess.historyservice.controller;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.models.Turn;
import com.chess.historyservice.models.external.PieceType;
import com.chess.historyservice.models.external.PlayerColor;
import com.chess.historyservice.models.external.Position;
import com.chess.historyservice.services.HistoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest
class HistoryControllerTest {

    @MockBean
    HistoryServiceImpl historyService;

    @Autowired
    private MockMvc mockMvc;

    private final String LOGIN = "winner";
    private final Long GAME_ID = 1L;

    private Game game;
    private Turn turn;

    private ArrayList<Turn> turns = new ArrayList<>();

    @BeforeEach
    void setUp() {
        turn = Turn.builder()
                .turnNumber(1)
                .game(game)
                .pieceType(PieceType.BISHOP)
                .initialPosition(new Position(1, 1))
                .turnId(2L)
                .destinationPosition(new Position(2, 1))
                .playerColor(PlayerColor.WHITE)
                .build();
        turns.add(turn);
        game = Game.builder()
                .blackPlayer(LOGIN)
                .whitePlayer("loser")
                .winner(LOGIN)
                .duration(Duration.ofSeconds(12))
                .finishTime(ZonedDateTime.now())
                .gameId(GAME_ID)
                .turns(turns)
                .build();
    }

    @Test
    void getAllGamesByUser() throws Exception {
        ArrayList<Game> games = new ArrayList<>();
        games.add(game);

        when(historyService.findAllGamesByUserLogin(any(String.class))).thenReturn(games);

        mockMvc.perform(get("/history/games/" + LOGIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].winner").value(LOGIN))
                .andExpect(jsonPath("$[0].totalTurns").value(turns.size()));
    }

    @Test
    void getGameById() throws Exception {

        when(historyService.findGameById(any(Long.class))).thenReturn(Optional.ofNullable(game));

        mockMvc.perform(get("/history/game/" + GAME_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.gameId").value(GAME_ID));
    }
}
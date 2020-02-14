package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.repositories.HistoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HistoryServiceImplTest {

    @Mock
    private HistoryRepository historyRepository;

    @InjectMocks
    private HistoryServiceImpl historyService;


    @Test
    void findAllGamesByUserLogin() {
        String userLogin = "login";
        when(historyRepository.findAllByWhitePlayerNameOrBlackPlayerName(userLogin, userLogin))
                .thenReturn(new ArrayList<>());

        List<Game> games = historyService.findAllGamesByUserLogin(userLogin);

        assertEquals(0, games.size());
        Mockito.verify(historyRepository, Mockito.times(1))
                .findAllByWhitePlayerNameOrBlackPlayerName(userLogin, userLogin);
    }

    @Test
    void findGameById() {
        Long gameId = 1L;
        when(historyRepository.findById(gameId)).thenReturn(Optional.empty());

        Optional<Game> game = historyService.findGameById(gameId);

        assertThat(game.isEmpty());
        Mockito.verify(historyRepository, Mockito.times(1))
                .findById(gameId);
    }
}
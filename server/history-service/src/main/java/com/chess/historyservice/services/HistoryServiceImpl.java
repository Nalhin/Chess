package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.repositories.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    HistoryRepository historyRepository;

    @Override
    public List<Game> findAllGamesByUserLogin(String userLogin) {
        return historyRepository.findAllByWhitePlayerNameOrBlackPlayerName(userLogin ,userLogin);
    }

    @Override
    public Optional<Game> findGameById(Long gameId) {
        return historyRepository.findById(gameId);
    }
}

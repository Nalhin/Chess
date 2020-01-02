package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.repositories.GameRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    GameRepository gameRepository;

    @Override
    public Game save(Game game) {
        return gameRepository.save(game);
    }

    @Override
    public List<Game> findAllGamesByUserLogin(String userLogin) {
        return gameRepository.findAllByWhitePlayerOrBlackPlayer(userLogin ,userLogin);
    }

    @Override
    public Optional<Game> findGameById(Long gameId) {
        return gameRepository.findById(gameId);
    }
}

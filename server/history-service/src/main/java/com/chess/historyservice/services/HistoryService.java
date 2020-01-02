package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;

import java.util.List;
import java.util.Optional;

public interface HistoryService  {
    public Game save(Game game);

    public Optional<Game> findGameById(Long gameId);

    public List<Game> findAllGamesByUserLogin(String login);
}

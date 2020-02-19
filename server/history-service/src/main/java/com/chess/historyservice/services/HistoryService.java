package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;

import java.util.List;
import java.util.Optional;

public interface HistoryService  {

    Optional<Game> findGameById(Long gameId);

    List<Game> findAllGamesByUserLogin(String login);
}

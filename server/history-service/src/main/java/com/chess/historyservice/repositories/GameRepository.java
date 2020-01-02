package com.chess.historyservice.repositories;

import com.chess.historyservice.models.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

    List<Game> findAllByWhitePlayerOrBlackPlayer(String whitePlayer, String blackPlayer);
}

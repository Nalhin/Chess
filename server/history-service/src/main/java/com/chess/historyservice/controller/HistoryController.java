package com.chess.historyservice.controller;

import com.chess.historyservice.dto.GameWithTurnCountDto;
import com.chess.historyservice.models.Game;
import com.chess.historyservice.services.HistoryServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/history")
@AllArgsConstructor
public class HistoryController {

    private final HistoryServiceImpl historyService;


    @GetMapping(value = "/games/{login}")
    public ResponseEntity<List<GameWithTurnCountDto>> getAllGamesByUser(@PathVariable String login) {
        List<Game> games = historyService.findAllGamesByUserLogin(login);

        return new ResponseEntity<>(games.stream()
                .sorted(Comparator.comparing(Game::getFinishTime).reversed())
                .map(GameWithTurnCountDto::mapToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping(value = "/game/{gameId}")
    public ResponseEntity<Game> getGameById(@PathVariable Long gameId) {

        return ResponseEntity.of(historyService.findGameById(gameId));
    }
}

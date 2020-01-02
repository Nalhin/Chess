package com.chess.historyservice.models;

import com.chess.historyservice.models.external.PlayerColor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name = "id")
    private Long gameId;

    @Column(name="black_player_name")
    private String blackPlayerName;

    @Column(name="white_player_name")
    private String whitePlayerName;

    private PlayerColor winner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game",fetch = FetchType.EAGER)
    private List<Turn> turns = new ArrayList<>();

    @Column(name="finish_time")
    @CreationTimestamp
    private LocalDateTime finishTime;

    @Column(name="duration")
    private Duration duration;
}

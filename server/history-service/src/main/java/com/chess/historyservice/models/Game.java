package com.chess.historyservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "games")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name = "id")
    private Long gameId;

    @Column(name="black_player")
    private String blackPlayer;

    @Column(name="white_player")
    private String whitePlayer;

    private String winner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game",fetch = FetchType.EAGER)
    private List<Turn> turns;

    @Column(name="finish_time")
    @CreationTimestamp
    private LocalDateTime finishTime;

    @Column(name="duration")
    private Duration duration;
}

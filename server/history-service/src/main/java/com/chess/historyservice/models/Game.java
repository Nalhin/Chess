package com.chess.historyservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.Duration;
import java.time.ZonedDateTime;
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

    @Column(name = "black_player")
    private String blackPlayer;

    @Column(name = "white_player")
    private String whitePlayer;

    private String winner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game", fetch = FetchType.EAGER)
    private List<Turn> turns;

    @Column(name = "finish_time")
    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private ZonedDateTime finishTime;

    @Column(name = "duration")
    private Duration duration;
}

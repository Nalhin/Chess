package com.chess.historyservice.models;

import com.chess.historyservice.models.external.PieceType;
import com.chess.historyservice.models.external.PlayerColor;
import com.chess.historyservice.models.external.Position;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "turns")
@TypeDef(
        name = "json",
        typeClass = JsonStringType.class
)
public class Turn {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name = "turn_id")
    private Long turnId;

    @ManyToOne
    @JoinColumn(name = "game_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Game game;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "initial_position")
    private Position initialPosition;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "destination_position")
    private Position destinationPosition;

    @Column(name = "piece_type")
    private PieceType pieceType;

    @Column(name = "player_color")
    private PlayerColor playerColor;
}
